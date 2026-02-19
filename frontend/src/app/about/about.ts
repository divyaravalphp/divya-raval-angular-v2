import { Component, signal } from '@angular/core'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
 projects = [
    { name: 'National Data Hub', description: 'Architected high-availability systems for government infrastructure.' },
    { name: 'FinTech SaaS', description: 'Developed a scalable multi-tenant billing platform using Laravel.' }
  ];

  techStack = ['PHP 8.4', 'Laravel 12', 'Angular 21', 'Node.js', 'MySQL', 'Docker', 'Redis', 'AWS'];

  citations = signal([
    { id: 4, text: 'Senior Developer Performance Review - Tech Solutions Ltd.' },
    { id: 8, text: 'Employment Verification: 7+ Years Full-Stack Experience.' },
    { id: 97, text: 'Official Project Sign-off: Ministry of Ayush Web Portal v2.0.' },
    { id: 98, text: 'API Documentation & Unified Layer Architecture Report (2025).' },
    { id: 103, text: "ICCR Digital Transformation Case Study – Ministry of External Affairs." },
    { id: 13, text: 'Zoobiz AI-Matching Algorithm Patent/Technical Spec.' },
    { id: 39, text: 'User Engagement Analytics Report - Zoobiz Q3.' },
    { id: 55, text: 'M.Sc. Computer Application Degree - Gujarat University.' },
    { id: 57, text: 'K.S. School of Business Management Alumni Records.' }
  ]);
  
}
