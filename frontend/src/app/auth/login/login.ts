
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Delete the two old auth imports and use this single correct one:
 
 
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService); // Use this for both API and Signal
  private router = inject(Router);

  errorMessage = signal('');
  isLoading = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => { 
          localStorage.setItem('admin_token', response.token); 
          this.authService.setLoginStatus(true);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => { 
          this.errorMessage.set(err.error?.message || 'Login Failed 123');
          this.isLoading.set(false);
        }
      });
    }
  }
}