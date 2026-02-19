import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);
  // Use a signal or a simple object to hold profile data
  profileData = signal<any>(null);

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.apiService.getProfile().subscribe({
      next: (data) => {
        this.profileData.set(data);
      },
      error: (err) => console.error('Error fetching profile for home:', err)
    });
  }
}
