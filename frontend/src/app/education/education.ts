import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { ApiService } from '../services/api';
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
  private apiService = inject(ApiService);
  
  // Use a signal for the dynamic list
  educationList = signal<EducationItem[]>([]);

  ngOnInit() {
    this.fetchEducation();
  }

  fetchEducation() {
    // API endpoint for your education table
     this.apiService.getEducation().subscribe({
      next: (data) => {
        this.educationList.set(data);
      },
      error: (err) => console.error('Failed to load education data:', err)
    });
  }
}