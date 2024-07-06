import { Component } from '@angular/core';
import { Account, Role } from '@app/_models';
import { AccountService } from '@app/_services';


@Component({ selector: 'app-footer', templateUrl: 'footer.component.html', styleUrls : ['footer.component.css']})
export class FooterComponent {
    Role = Role;
    account?: Account | null;

    constructor(
        private accountService: AccountService 
    ) { }

    ngOnInit() {
        this.accountService.account.subscribe(x => this.account = x);
    }
}