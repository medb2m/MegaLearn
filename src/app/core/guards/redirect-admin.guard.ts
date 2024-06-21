import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@app/_services';
import { Role } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class RedirectAdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const account = this.accountService.accountValue;
        if (account && account.role === Role.Admin) {
            // Redirect to admin
            this.router.navigate(['/admin/dashboard']);
            return false;
        }
        return true;
    }
}
