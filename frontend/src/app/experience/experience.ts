import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

interface WorkExperience {
  id?: number;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  projects: string[];     // Strictly defined as array for the template
  achievements: string[]; // Strictly defined as array for the template
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements OnInit {
  private http = inject(HttpClient);
  
  // Use a signal for reactive data binding
  workHistory = signal<WorkExperience[]>([]);

  ngOnInit() {
    this.fetchExperience();
  }

  fetchExperience() {
    // API endpoint pointing to your professional_experiences table
    this.http.get<any[]>('http://localhost:3000/api/experiences').subscribe({
      next: (data) => {
        const formattedData: WorkExperience[] = data.map(job => ({
          ...job,
          // Map DB columns to interface (e.g., if DB uses 'job_period' instead of 'period')
          period: job.period || job.job_period, 
          role: job.role || job.designation,
          // Helper functions ensure these return string[] even if stored as strings in DB
          projects: this.parseList(job.projects),
          achievements: this.parseList(job.achievements)
        }));
        this.workHistory.set(formattedData);
      },
      error: (err) => console.error('Data fetch failed:', err)
    });
  }

  /**
   * Helper to handle both JSON strings or comma-separated strings from MySQL
   */
  private parseList(item: any): string[] {
    if (Array.isArray(item)) return item;
    if (typeof item === 'string' && item.length > 0) {
      try {
        const parsed = JSON.parse(item);
        return Array.isArray(parsed) ? parsed : [item];
      } catch {
        return item.split(',').map(s => s.trim()).filter(s => s.length > 0);
      }
    }
    return [];
  }
}