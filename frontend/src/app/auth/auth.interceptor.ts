import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Get the token from localStorage
  const token = localStorage.getItem('token'); 

  // 2. If token exists, clone request and add Header
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // 3. If no token, send request as is (will result in 401 if route is protected)
  return next(req);
};