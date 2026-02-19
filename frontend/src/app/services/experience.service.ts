import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../models/experience.model';
import { ApiService } from './api';
@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private http = inject(HttpClient); 
  private api = inject(ApiService);
  experience = signal<Experience[]>([]);

  private get apiUrl() {
    return `${this.api.baseUrl}/experiences`;
  }

  fetchExperience() {
    this.http.get<Experience[]>(this.apiUrl).subscribe(data => this.experience.set(data));
  }

  createExperience(project: any) {
    return this.http.post(this.apiUrl, project);
  }

  updateExperience(id: number, experience: any) {
    return this.http.put( `${this.apiUrl}/${id}`, experience);
  }

  deleteExperience(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}