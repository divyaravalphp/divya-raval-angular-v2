import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/projects'; // Your Laravel API
  
  projects = signal<Project[]>([]);

  fetchProjects() {
    this.http.get<Project[]>(this.apiUrl).subscribe(data => this.projects.set(data));
  }

  createProject(project: any) {
    return this.http.post(this.apiUrl, project);
  }

  updateProject(id: number, project: any) {
    return this.http.put(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}