import { Injectable , inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
 
  private http = inject(HttpClient);

  // Define your common base URL here
  private readonly baseUrl = 'http://localhost:3000/api';

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile`);
  }

  // You can add more methods here easily
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects`);
  }

    getExperience(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/experiences`);
  }
  
  getEducation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/education`);
  }

  sendContactMessage(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact`, formData);
  }

   getContact(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/contact`);
  }
}
