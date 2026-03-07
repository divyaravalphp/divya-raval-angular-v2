import { Component } from '@angular/core';
import { NgClass , NgFor } from '@angular/common';
interface Project {
  title: string;
  category: string;
  typeClass: string; // Used for CSS logic: 'gov-project', 'saas-project', etc.
  description: string;
  features: string[];
  link: string;
}

@Component({
  selector: 'app-projects',
  imports: [NgClass , NgFor],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  isActive = true;
projects: Project[] = [
  {
      title: '6-Leg Forced Matrix MLM',
      category: 'FinTech & Network Marketing',
      typeClass: 'mlm-project',
      description: 'Architecting a deterministic, high-integrity MLM ecosystem with a focus on infinite depth tree structures and automated reward distribution using Laravel 12.',
      features: [
        'Deterministic placement logic (1 → 6) with no gaps',
        'Immediate, sequential earnings calculation with DB transactions',
        'Advanced downline visibility and hierarchical UI state management'
      ],
      link: 'https://mlmpro.shop/' // Project in active development
    },
  {
      title: 'Indian Naval Placement Agency (INPA)',
      category: 'Government & Recruitment',
      typeClass: 'gov-project',
      description: 'Developed a specialized recruitment portal for the Indian Navy, facilitating seamless career transitions for naval veterans and retiring personnel into the corporate sector.',
      features: [
        'Advanced job-matching engine for veteran skillsets',
        'Secure registration and verification for ex-servicemen',
        'Employer dashboard for corporate talent acquisition'
      ],
      link: 'https://www.indiannavy.nic.in/inpa/'
    },
  {
      title: 'Chitra-B Publicity',
      category: 'Media & Advertising',
      typeClass: 'media-project',
      description: 'Administered the full-scale website and REST API infrastructure for a media organization, optimizing the digital distribution of tailored media bookings across diverse advertising sectors.',
      features: [
        'Robust REST API for high-availability data exchange',
        'Automated media dissemination in multiple formats (PPT, CSV, PDF)',
        'Tailored booking engine for client-specific media area needs'
      ],
      link: 'https://chitra-b-publicity.com/'
    },
  {
      title: 'Vishwanath Builders',
      category: 'Real Estate & ERP',
      typeClass: 'realestate-project',
      description: 'Led the bespoke development of a comprehensive real estate management suite, streamlining multi-site order workflows and administrative operations for high-volume construction projects.',
      features: [
        'Multi-site order and product control management',
        'Automated employee administration and payroll systems',
        'REST API integration for mobile application menus and user roles'
      ],
      link: 'https://www.vishwanathbuilders.com/'
    },
  {
      title: 'Zoobiz',
      category: 'Professional Networking & B2B',
      typeClass: 'networking-project',
      description: 'Lead the comprehensive refactoring and feature engineering of a professional networking platform, significantly boosting user engagement through data-driven matching and location-based services[cite: 1, 2].',
      features: [
        'AI-driven matching for professional networking [cite: 1, 2]',
        'Geo-tagging for local business discovery [cite: 1, 2]',
        'Digital classifieds and B2B partnership tools '
      ],
      link: 'https://zoobiz.app/'
    },
    {
      title: 'Ministry of Ayush',
      category: 'Government of India',
      typeClass: 'gov-project',
      description: 'Spearheaded the end-to-end development of the official portal for traditional medicine initiatives (AYUSH), ensuring a secure and scalable platform.',
      features: ['GIGW-compliant frontend for accessibility', 'Centralized API Architecture for sub-portals', 'STQC security audit cleared'],
      link: 'https://ayush.gov.in/'
    },
    {
      title: 'InnsAble',
      category: 'Hospitality SaaS',
      typeClass: 'saas-project',
      description: 'A bespoke Property Management System with a centralized calendar for real-time room management and streamlined booking.',
      features: ['GST-compliant invoicing', 'Housekeeping & facility tracking', 'Complex guest stay history management'],
      link: 'https://www.idreamtechnosoft.com/innsable.php'
    },
    {
      title: 'ICCR Portal',
      category: 'Government of India',
      typeClass: 'gov-project',
      description: 'Architected the digital face of India\'s cultural diplomacy, supporting scholarship tracking across 190+ countries.',
      features: ['International student application APIs', 'Multi-language support for 37 global centers', 'Encrypted foreign national records'],
      link: 'https://iccr.gov.in/'
    },
    {
      title: 'Fincasys',
      category: 'FinTech / PropTech',
      typeClass: 'saas-project',
      description: 'Automated financial workflows and communication frameworks for residents and gated community gatekeepers.',
      features: ['Recurring billing & expense tracking', 'Digital intercom gatekeeper app', 'Encrypted payment gateway integration'],
      link: 'https://www.fincasys.com/'
    },
    {
      title: 'GDMA Portal',
      category: 'Industrial Association',
      typeClass: 'enterprise-project',
      description: 'Comprehensive web portal and RESTful API suite managing operations for 1,500+ chemical manufacturing units.',
      features: ['Real-time sync with MyAssociation app', 'Automated membership renewals', 'Optimized SQL for searchable directories'],
      link: 'https://gdma.myassociation.app/'
    }
  ];
}
