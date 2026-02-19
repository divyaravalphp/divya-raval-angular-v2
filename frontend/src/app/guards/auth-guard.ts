import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// Changed from '../services/auth.service' to '../auth/auth'
import { AuthService } from '../auth/auth'; 

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};