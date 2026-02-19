import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminmessages.html',
  styleUrl: './adminmessages.scss'
}) 
export class AdminMessages implements OnInit {
  private http = inject(HttpClient);
  
  messages = signal<any[]>([]);
  activeReplyId = signal<number | null>(null);
  replyContent = '';

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.http.get<any[]>('http://localhost:3000/api/admin/messages')
      .subscribe(data => this.messages.set(data));
  }

  sendReply(msg: any) {
    const payload = {
      id: msg.id,
      email: msg.email,
      replyText: this.replyContent
    };

    this.http.post('http://localhost:3000/api/admin/reply', payload).subscribe({
      next: () => {
        alert('Reply Sent!');
        this.replyContent = '';
        this.activeReplyId.set(null);
        this.loadMessages(); // Refresh list
      },
      error: (err) => console.error(err)
    });
  }
}