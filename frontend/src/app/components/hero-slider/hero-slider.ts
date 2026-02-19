import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-hero-slider',
  standalone: true, // Recommended for Angular 21
  imports: [CommonModule],
  templateUrl: './hero-slider.html',
  styleUrl: './hero-slider.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HeroSlider {
  // Centralized Profile Information
  profile_info = {
    name: 'Divya Raval',
    cv_filename: 'remote_divyaraval_laravel_php.pdf',
    cv_path: 'assets/remote_divyaraval_laravel_php.pdf',
    experience_years: 7,
    specialization: 'PHP, Laravel & Angular 21'
  };

  // Slides using dynamic data from profile_info
  slides = [
    { 
      title: 'Architecting Scalable Systems', 
      desc: `Expertise in ${this.profile_info.specialization}`, 
      bg: '#F8F9FA' 
    },
    { 
      title: 'Full-Stack Performance', 
      desc: `Bridging complex backend with ${this.profile_info.experience_years}+ years of experience`, 
      bg: '#F8F9FA' 
    }
  ];
}