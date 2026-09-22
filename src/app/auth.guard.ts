import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const isAuthenticated = localStorage.getItem('codigoDelasAuthenticated') === 'true';

  if (isAuthenticated) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};