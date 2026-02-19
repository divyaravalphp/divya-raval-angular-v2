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
  
  public readonly baseUrl = 'http://localhost:3000/api';
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile`);
  }
 getSocialLinks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/social-links`);
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

 getMessagesNotReplied(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/messagesnotreplied`);
  }
    getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/messages`);
  }

  sendAdminReply(payload: { id: any; email: any; replyText: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/reply`, payload);
  }


  getExperiences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/experiences`);
  }
  
  createExperience(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/experiences`, payload);
  }
  
  updateExperience(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/experiences/${id}`, payload);
  }
  
  deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/experiences/${id}`);
  }

  updateProfile(id: number | string, formData: FormData): Observable<any> {
  return this.http.put(`${this.baseUrl}/profile/${id}`, formData);
}

}
