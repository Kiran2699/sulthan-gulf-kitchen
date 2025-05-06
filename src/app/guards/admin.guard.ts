import { CanActivateFn, Router } from '@angular/router';
import { MainService } from '../main.service';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(MainService);
  const router = inject(Router);

  const token = authService.CurrentUserRole == 'A' || localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    router.navigate(['admin/login']);
    return false;
  }
};
