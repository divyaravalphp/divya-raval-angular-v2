import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Added for @if

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  
  contactForm: FormGroup;
  // Signal to track if the email was sent successfully
  isSubmitted = signal(false);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.http.post('http://localhost:3000/api/contact', this.contactForm.value)
        .subscribe({
          next: (res) => {
            this.isSubmitted.set(true); // Show success message
            this.contactForm.reset();    // Clear form fields
            
            // Optional: Hide message after 5 seconds and "refresh" view
            setTimeout(() => this.isSubmitted.set(false), 5000);
          },
          error: (err) => alert('Something went wrong. Please try again.')
        });
    }
  }
}