import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = next.data['roles'];
    if (!roles || !roles.includes('admin') || !roles.includes('mod') || !roles.includes('user')) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}