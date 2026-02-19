import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  private http = inject(HttpClient);
  readonly currentYear = signal(new Date().getFullYear());
  // Storage for our dynamic data
  profileData = signal<any>(null);
  socialLinks = signal<any[]>([]);

  ngOnInit() {
    this.fetchProfile();
    this.fetchSocialLinks();
  }

  fetchProfile() {
    this.http.get<any>('http://localhost:3000/api/profile').subscribe({
      next: (data) => this.profileData.set(data),
      error: (err) => console.error('Error fetching footer profile:', err)
    });
  }

  fetchSocialLinks() {
    this.http.get<any[]>('http://localhost:3000/api/social-links').subscribe({
      next: (data) => this.socialLinks.set(data),
      error: (err) => console.error('Error fetching social links:', err)
    });
  }
}