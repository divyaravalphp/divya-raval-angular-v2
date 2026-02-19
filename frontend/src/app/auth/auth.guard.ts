import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Since guard is in the same folder

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Change 'token' to 'admin_token' to match your Login logic
  const token = localStorage.getItem('admin_token');

  if (token && token.length > 10) {
    return true; 
  } else {
    return router.parseUrl('/login'); 
  }
};