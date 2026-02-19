import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { ApiService } from '../services/api';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private api = inject(ApiService);
  // Initialize signal by checking localStorage
  isLoggedIn = signal<boolean>(!!localStorage.getItem('admin_token'));

  login(credentials: any) {
    // Replace with your actual Laravel API URL
    return this.http.post<any>(`${this.api.baseUrl}/auth/login`, credentials);
  }

  logout() {
    localStorage.removeItem('admin_token');
    this.isLoggedIn.set(false);
  }

  setLoginStatus(status: boolean) {
    this.isLoggedIn.set(status);
  }
}