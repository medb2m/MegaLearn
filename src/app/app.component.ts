import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AccountService } from './_services';
import { Account, Role } from './_models';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';


@Component({ selector: 'app-root', templateUrl: 'app.component.html', styleUrls : ['app.component.css'] })
export class AppComponent {
    Role = Role;
    account?: Account | null;
    showBackButton = true;


    constructor(
        private router : Router, 
        private accountService : AccountService, 
        private titleService: Title,
        private activatedRoute: ActivatedRoute
    ){}


    ngOnInit(){
        this.accountService.account.subscribe(x => this.account = x);
        this.router.events.subscribe( event => {
            if (event instanceof NavigationEnd){
                this.showBackButton = event.urlAfterRedirects !== '/' && this.account?.role !== Role.Admin
            }
        })

        // titles 
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map(route => {
              while (route.firstChild) route = route.firstChild;
              return route;
            }),
            map(route => route.snapshot.data)
          ).subscribe(data => {
            if (data['title']) {
              this.titleService.setTitle(data['title']);
            }
          });
        }
}