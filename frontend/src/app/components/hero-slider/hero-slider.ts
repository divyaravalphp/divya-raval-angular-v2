 
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import Swiper elements
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-hero-slider',
 imports: [CommonModule],
  templateUrl: './hero-slider.html',
  styleUrl: './hero-slider.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for web components
})
export class HeroSlider {
  slides = [
    { title: 'Architecting Scalable Systems', desc: 'Expertise in PHP, Laravel & Angular 21', bg: '#F8F9FA' },
    { title: 'Full-Stack Performance', desc: 'Bridging complex backend with reactive UI', bg: '#F8F9FA' }
  ];
}
