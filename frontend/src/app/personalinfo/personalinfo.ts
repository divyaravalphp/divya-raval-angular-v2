import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../auth/profile.service';

 
@Component({
  selector: 'app-personalinfo',
   imports: [ReactiveFormsModule],
  templateUrl: './personalinfo.html',
  styleUrl: './personalinfo.scss',
})
export class Personalinfo implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  
  profileForm: FormGroup = this.fb.group({
    id: [null], // Critical for the PUT request
    full_name: ['', Validators.required],
    current_title: [''],
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

  successMsg = signal('');
  isSubmitting = signal(false);

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe((data: any) => {
      // If backend returns an array, take the first item
      const profile = Array.isArray(data) ? data[0] : data;
      if (profile) {
        this.profileForm.patchValue(profile);
      }
    });
  }

  onSubmit() {
     if (this.profileForm.valid) {
    this.isSubmitting.set(true);
    
    // Get the ID from the form (which we populated during loadProfile)
    const id = this.profileForm.get('id')?.value;

    if (!id) {
      console.error("Cannot update: Profile ID is missing");
      this.isSubmitting.set(false);
      return;
    }

    // Now this matches the Service definition: 2 arguments
    this.profileService.updateProfile(id, this.profileForm.value).subscribe({
      next: (res) => {
        this.successMsg.set('Profile Updated Successfully!');
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error("Update failed:", err);
        this.isSubmitting.set(false);
      }
    });
  }
  }
}
