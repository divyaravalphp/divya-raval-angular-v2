import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private api = inject(ApiService);
  // Signal for UI logic (app.html)
  isLoggedIn = signal<boolean>(!!localStorage.getItem('admin_token'));

  login(credentials: any) {
    // Correct URL matching your Express backend
    return this.http.post<any>(`${this.api.baseUrl}/auth/login`, credentials);
  }

  setLoginStatus(status: boolean) {
    this.isLoggedIn.set(status);
  }

  logout() {
    localStorage.removeItem('admin_token');
    this.isLoggedIn.set(false);
  }
}