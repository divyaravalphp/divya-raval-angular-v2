import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface EducationItem {
  id?: number;
  degree: string;
  institution: string;
  period: string;
  result: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education implements OnInit {
  private http = inject(HttpClient);
  
  // Use a signal for the dynamic list
  educationList = signal<EducationItem[]>([]);

  ngOnInit() {
    this.fetchEducation();
  }

  fetchEducation() {
    // API endpoint for your education table
    this.http.get<EducationItem[]>('http://localhost:3000/api/education').subscribe({
      next: (data) => {
        this.educationList.set(data);
      },
      error: (err) => console.error('Failed to load education data:', err)
    });
  }
}