import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor } from '@angular/common'; // Fixed import

interface Project {
  id?: number;
  title: string;
  category: string;
  typeClass: string; 
  description: string;
  features: string[]; // 👈 Change this to strictly string[]
  link: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgClass, NgFor], // Ensure these are listed here
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  private http = inject(HttpClient);
  projects = signal<Project[]>([]);

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
  this.http.get<any[]>('http://localhost:3000/api/projects').subscribe({
    next: (data) => {
      const formattedData: Project[] = data.map((project: any) => {
        let featureArray: string[] = [];

        // Check if features is a string (comma-separated from DB)
        if (typeof project.features === 'string') {
          featureArray = project.features.split(',').map((f: string) => f.trim());
        } 
        // Check if it's already an array
        else if (Array.isArray(project.features)) {
          featureArray = project.features;
        }

        return {
          ...project,
          features: featureArray
        };
      });
      
      this.projects.set(formattedData);
    },
    error: (err) => console.error('Error fetching projects:', err)
  });
}
}