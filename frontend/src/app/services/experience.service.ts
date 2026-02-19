import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../models/experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/experience'; // Your Laravel API
  
  experience = signal<Experience[]>([]);

  fetchExperience() {
    this.http.get<Experience[]>(this.apiUrl).subscribe(data => this.experience.set(data));
  }

  createExperience(project: any) {
    return this.http.post(this.apiUrl, project);
  }

  updateExperience(id: number, experience: any) {
    return this.http.put(`${this.apiUrl}/${id}`, experience);
  }

  deleteExperience(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}