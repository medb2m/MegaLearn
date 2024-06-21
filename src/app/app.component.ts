import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccountService } from './_services';
import { Account, Role } from './_models';


@Component({ selector: 'app-root', templateUrl: 'app.component.html', styleUrls : ['app.component.css'] })
export class AppComponent {
    Role = Role;
    account?: Account | null;
    showBackButton = true;


    constructor(
        private router : Router, 
        private accountService : AccountService
    ){}
    ngOnInit(){
        this.accountService.account.subscribe(x => this.account = x);
        this.router.events.subscribe( event => {
            if (event instanceof NavigationEnd){
                this.showBackButton = event.urlAfterRedirects !== '/' && this.account?.role !== Role.Admin
            }
        })
    }
}