import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

import { ApiService } from './api';
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private api = inject(ApiService); 
  private get apiUrl() {
    return `${this.api.baseUrl}/projects`;
  }
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