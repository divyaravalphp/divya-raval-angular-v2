import { Component } from '@angular/core'; 
@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
 projects = [
    { name: 'National Data Hub', description: 'Architected high-availability systems for government infrastructure.' },
    { name: 'FinTech SaaS', description: 'Developed a scalable multi-tenant billing platform using Laravel.' }
  ];

  techStack = ['PHP 8.4', 'Laravel 12', 'Angular 21', 'Node.js', 'MySQL', 'Docker', 'Redis', 'AWS'];

}
