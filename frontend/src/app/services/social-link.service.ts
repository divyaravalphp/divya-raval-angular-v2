import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialLink } from '../models/social-link.model';

@Injectable({ providedIn: 'root' })
export class SocialLinkService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/social-links';
  
  links = signal<SocialLink[]>([]);

  fetchLinks() {
    this.http.get<SocialLink[]>(this.apiUrl).subscribe(data => this.links.set(data));
  }

  createLink(link: SocialLink) {
    return this.http.post(this.apiUrl, link);
  }

  updateLink(id: number, link: SocialLink) {
    return this.http.put(`${this.apiUrl}/${id}`, link);
  }

  deleteLink(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}