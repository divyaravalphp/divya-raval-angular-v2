import { Component, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { ApiService } from '../services/api';

@Component({
  selector: 'app-personalinfo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personalinfo.html',
  styleUrl: './personalinfo.scss'
})
export class Personalinfo implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private apiService = inject(ApiService);
  currentResume: string | null = null;
  currentPhoto: string | null = null;
  selectedPhoto: File | null = null;
  // Signals for state management
  isSubmitting = signal(false);
  successMsg = signal('');
  
  // File state
  selectedFile: File | null = null;

  profileForm: FormGroup = this.fb.group({
    id: [null],
    full_name: ['', Validators.required],
    current_title: ['', Validators.required],
    summary: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    address_line_1: [''],
    address_line_2: [''],
    city: [''],
    state: [''],
    zip_code: [''],
    experience_years: [0]
  });

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
  this.apiService.getProfile().subscribe({
    next: (data) => {
      this.profileForm.patchValue(data);
      this.currentResume = data.resume; // Store the filename from the 'resume' column
       this.currentPhoto = data.photo; // Store the filename from the 'resume' column
    },
    error: (err) => console.error('Fetch error', err)
  });
}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onPhotoSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedPhoto = file;
  }
}

 
onSubmit() {
  if (this.profileForm.invalid) return;

  this.isSubmitting.set(true);
  const formData = new FormData();
  
  Object.keys(this.profileForm.controls).forEach(key => {
    const value = this.profileForm.get(key)?.value;
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  if (this.selectedFile) {
    formData.append('resume', this.selectedFile, this.selectedFile.name);
  }
  if (this.selectedPhoto) {
    formData.append('photo', this.selectedPhoto, this.selectedPhoto.name);
  }

  const id = this.profileForm.get('id')?.value;
  
  this.apiService.updateProfile(id, formData).subscribe({
    next: (res: any) => {
      this.successMsg.set('Profile updated successfully!');
      this.isSubmitting.set(false);
      
      // ✅ FIX: Update the view variables with the new filenames from the server
      if (res.resume) this.currentResume = res.resume;
      if (res.photo) this.currentPhoto = res.photo;

      // Reset selection state
      this.selectedFile = null;
      this.selectedPhoto = null;

      // Optional: Clear success message after 3 seconds
      setTimeout(() => this.successMsg.set(''), 3000);
    },
    error: (err) => {
      console.error('Update failed:', err);
      this.isSubmitting.set(false);
    }
  });
}
}