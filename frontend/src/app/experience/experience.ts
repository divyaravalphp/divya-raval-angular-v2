import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
interface WorkExperience {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  projects: string[];
  achievements: string[];
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  workHistory: WorkExperience[] = [
    {
    role: "Senior Laravel Developer - Remote",
    company: "Dsolution Creation",
    period: "Jan 2026 – Present",
    location: "Telangana, India",
    description: "Leading the development of complex web architectures with a focus on modern full-stack technologies and advanced CSS styling for high-performance applications.",
    projects: [
      "MLM System: Architecting a 6-leg forced matrix MLM platform using Laravel, featuring deterministic placement logic and automated reward calculations.",
      "Custom UI Engineering: Implementing intricate CSS-driven designs to ensure data integrity and clear visual hierarchy in user downline visualizations."
    ],
    achievements: [
      "Engineered a scalable MLM tree logic supporting infinite depth with robust transaction-based placement[cite: 130, 302].",
      "Optimized data visibility rules for tiered user access and parent-child hierarchy[cite: 253, 258]."
    ]
  },
  {
    role: "Parental Career Gap (Professional Development)",
    company: "Self-Directed Learning",
    period: "May 2022 – Dec 2025",
    location: "Remote",
    description: "Dedicated time to family responsibilities while actively upskilling in modern web technologies to stay at the forefront of the software engineering industry.",
    projects: [
      "Advanced Framework Study: Mastered Laravel 12, Angular, and Vue.js for building reactive frontend interfaces.",
      "Backend & Runtime Environments: Deep-dived into Node.js for asynchronous, event-driven server-side development."
    ],
    achievements: [
      "Successfully transitioned technical stack from traditional PHP to modern JavaScript frameworks (Angular/Vue) and Node.js.",
      "Completed comprehensive training on Laravel 12's newest features, ensuring mastery of the latest enterprise-grade PHP standards."
    ]
  },
    {
      period: 'Jun 2021 - May 2022',
      role: 'Senior Software Developer',
      company: 'Silver Touch Technologies Ltd.',
      location: 'Ahmedabad, India',
      description: 'Led development of high-performance systems including Land Revenue and E-Learning portals.',
      projects: ['Land Revenue Information System', 'UTIKS for ICCR', 'National War Memorial'],
      achievements: ['Engineered Land Revenue system for stakeholder accessibility', 'Architected UTIKS reducing admin overhead']
    },
    {
      period: 'Oct 2019 - May 2021',
      role: 'Senior Software Developer',
      company: 'Silverwing Technologies Ltd.',
      location: 'Ahmedabad, India',
      description: 'Managed full project lifecycles and refactored core platforms for AI integration.',
      projects: ['Zoobiz AI Matching', 'Chitra-B Publicity', 'Fincasys Financials'],
      achievements: ['Integrated Geo-tagging in Zoobiz', 'Streamlined multi-site management for Vishwanath Builders']
    },
    {
      period: 'Jun 2015 - Sep 2019',
      role: 'PHP Developer',
      company: 'IDream Technosoft Pvt. Ltd.',
      location: 'Ahmedabad, India',
      description: 'Focused on product standardization and modernization of legacy PHP platforms.',
      projects: ['SuperinnPlus Modernization'],
      achievements: ['Modernized SuperinnPlus core modules', 'Improved platform stability and UX']
    }
  ];
}
