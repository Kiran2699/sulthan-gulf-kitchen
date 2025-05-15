import { CanActivateFn, Router } from '@angular/router';
import { MainService } from '../main.service';
import { inject } from '@angular/core';


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(MainService);
  const router = inject(Router);
  const tokentsing = localStorage.getItem('token');
  let tokenData;
  if (tokentsing) {
    tokenData = JSON.parse(tokentsing);
  }
  const token = authService.CurrentUserRole == 'C' || tokenData.usertype == 'C';

  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
