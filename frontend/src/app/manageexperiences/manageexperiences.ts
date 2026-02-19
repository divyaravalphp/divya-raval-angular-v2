import { Component, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-experiences',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manageexperiences.html',
  styleUrl: './manageexperiences.scss'
})
export class Manageexperiences implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  
  // Use absolute URL to match your server.js port (3000)
  private apiUrl = 'http://localhost:3000/api/experiences'; 

  experiences = signal<any[]>([]);
  isModalOpen = signal(false);
  editMode = signal(false);
  selectedId = signal<number | null>(null);

  projectForm: FormGroup = this.fb.group({
    role: ['', Validators.required],
    company: ['', Validators.required],
    period_start: ['', Validators.required],
    period_end: [''],
    location: ['Remote'],
    description: ['', Validators.required],
    projects: [''], 
    achievements: ['']
  });

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.experiences.set(data),
      error: (err) => console.error('Fetch error:', err)
    });
  }

  openModal(data?: any) {
    this.editMode.set(!!data);
    if (data) {
      this.selectedId.set(data.id);
      this.projectForm.patchValue({
        ...data,
        // Slice YYYY-MM-DD to YYYY-MM for the HTML5 month input
        period_start: data.period_start?.substring(0, 7),
        period_end: data.period_end?.substring(0, 7),
        projects: Array.isArray(data.projects) ? data.projects.join(', ') : '',
        achievements: Array.isArray(data.achievements) ? data.achievements.join(', ') : ''
      });
    } else {
      this.projectForm.reset({ location: 'Remote' });
      this.selectedId.set(null);
    }
    this.isModalOpen.set(true);
  }

  save() {
    if (this.projectForm.invalid) return;

    const raw = this.projectForm.value;
    const payload = {
      ...raw,
      // Ensure backend gets full SQL DATE format (YYYY-MM-01)
      period_start: raw.period_start ? `${raw.period_start}-01` : null,
      period_end: raw.period_end ? `${raw.period_end}-01` : null,
      projects: raw.projects ? raw.projects.split(',').map((s: string) => s.trim()) : [],
      achievements: raw.achievements ? raw.achievements.split(',').map((s: string) => s.trim()) : []
    };

    const request = this.editMode() 
      ? this.http.put(`${this.apiUrl}/${this.selectedId()}`, payload)
      : this.http.post(this.apiUrl, payload);

    request.subscribe({
      next: () => {
        this.isModalOpen.set(false);
        this.fetchData();
      },
      error: (err) => console.error('Save error:', err)
    });
  }

  delete(id: number) {
    if (confirm('Delete this record?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.fetchData(),
        error: (err) => console.error('Delete error:', err)
      });
    }
  }
}