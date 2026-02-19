// src/app/dashboard/dashboard.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router'; 
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard  implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);
  messages = signal<any[]>([]);
  unrepliedCount = computed(() => 
    this.messages().filter(m => m.replied_at === null || m.replied_at === undefined).length
  );

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.http.get<any[]>('http://localhost:3000/api/admin/messagesnotreplied')
      .subscribe(data => this.messages.set(data));
  }

  logout() {
    this.authService.logout(); // Clears token & sets signal to false
    this.router.navigate(['/login']);
  }
}