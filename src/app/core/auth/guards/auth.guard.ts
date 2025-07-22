import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  console.log("tken",token)
  const isLoggedIn = !!token;

  authService['isLoggedInSubject'].next(isLoggedIn);

  if (!isLoggedIn) {
    router.navigate(['/sign-in']);
    return false;
  }

  return true;
};
