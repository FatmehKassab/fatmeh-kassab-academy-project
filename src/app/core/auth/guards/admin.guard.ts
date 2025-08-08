import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const token = authService.getToken();
  const isLoggedIn = !!token;
  const isAdmin = authService.isAdmin();

  if (!isLoggedIn || !isAdmin) {
    messageService.add({
      severity: 'warn',
      summary: 'Access Denied',
      detail: 'You do not have permission to access this page.'
    });

  
      router.navigate(['/home']);


    return false;
  }

  return true;
};
