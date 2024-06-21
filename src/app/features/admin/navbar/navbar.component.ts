import { Component } from '@angular/core';
import { Account, Role } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({selector: 'admin-navbar', templateUrl: 'navbar.component.html', styleUrls : ['../_assets/admin.css'] })
export class OverviewComponent {
    Role = Role;
    account?: Account | null;
    
    constructor(private accountService: AccountService) {
        this.accountService.account.subscribe(x => this.account = x);
    }

    logout() {
        this.accountService.logout();
    }
 }