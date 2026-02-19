import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profile {
  id?: number;
  full_name: string;
  current_title: string;
  summary: string;
  email: string;
  phone: string;
  experience_years: number;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/profile';

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  

  updateProfile(id: number | string, data: any): Observable<any> {
  // We use the ID in the URL and the data in the Body
  return this.http.put(`http://localhost:3000/api/profile/${id}`, data);
}
}