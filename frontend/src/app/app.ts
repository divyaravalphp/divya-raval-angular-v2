import { Component, signal , inject } from '@angular/core';  
 
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { HeroSlider } from './components/hero-slider/hero-slider'; 

import { AuthService } from './auth/auth.service'; // Fix path
@Component({
  selector: 'app-root',
 imports: [RouterLink, RouterOutlet, RouterLinkActive, Header, Footer,HeroSlider],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private authService = inject(AuthService);
  protected readonly title = signal('divya-raval-angular');
  public isLoggedIn = this.authService.isLoggedIn;
  menuItems = [
   { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Experience', path: '/experience' },
    { label: 'Education', path: '/education' },
    { label: 'Contact', path: '/contact' }
  ];

  isMenuOpen = false;

  // This is the missing piece!
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout() {
    this.authService.logout();
  }
} 