// src/app/manageprojects/manageprojects.ts
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-manageprojects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manageprojects.html',
  styleUrl: './manageprojects.scss'
})
export class Manageprojects implements OnInit {
  private fb = inject(FormBuilder);
  projectService = inject(ProjectService);

  isModalOpen = signal(false);
  editMode = signal(false);
  selectedId = signal<number | null>(null);

  projectForm = this.fb.group({
    title: ['', Validators.required],
    company: [''],
    category: ['FinTech', Validators.required],
    type_class: ['mlm-project', Validators.required],
    description: ['', Validators.required],
    features: ['', Validators.required], // Input as comma-separated string
    link: [''],
    status: ['development']
  });

  ngOnInit() {
    this.projectService.fetchProjects();
  }

  openModal(project?: Project) {
    this.isModalOpen.set(true);
    if (project) {
      this.editMode.set(true);
      this.selectedId.set(project.id!);
      this.projectForm.patchValue({
        ...project,
        features: project.features.join(', ')
      } as any);
    } else {
      this.editMode.set(false);
      this.projectForm.reset({ status: 'development', category: 'FinTech' });
    }
  }

  save() {
    if (this.projectForm.valid) {
      const val = this.projectForm.value;
      const payload = { 
        ...val, 
        features: val.features?.split(',').map(f => f.trim()) 
      } as Project;

      const action = this.editMode() 
        ? this.projectService.updateProject(this.selectedId()!, payload)
        : this.projectService.createProject(payload);

      action.subscribe(() => {
        this.projectService.fetchProjects();
        this.isModalOpen.set(false);
      });
    }
  }

  delete(id: number) {
    if (confirm('Delete this project?')) {
      this.projectService.deleteProject(id).subscribe(() => this.projectService.fetchProjects());
    }
  }
}