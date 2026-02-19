import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  
  // 1. The Signal: Checks localStorage immediately so the 
  //    Header/Footer stay hidden even if you refresh the page.
  isLoggedIn = signal<boolean>(!!localStorage.getItem('admin_token'));

  // 2. Laravel API Login Method
  login(credentials: any): Observable<any> {
    // Replace with your actual Laravel API URL
    const apiUrl = 'http://localhost:8000/api/login'; 
    
    return this.http.post<any>(apiUrl, credentials).pipe(
      tap(response => {
        if (response.token) {
          // Store token and update signal status
          localStorage.setItem('admin_token', response.token);
          this.isLoggedIn.set(true); 
        }
      })
    );
  }

  // 3. Logout Method
  logout() {
    localStorage.removeItem('admin_token');
    this.isLoggedIn.set(false);
  }

  // 4. Manual update method (just in case)
  setLoginStatus(status: boolean) {
    this.isLoggedIn.set(status);
  }
}