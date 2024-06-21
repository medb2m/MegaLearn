import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({ selector: 'app-back-button', templateUrl: 'back-button.component.html', styleUrls : ['back-button.component.css']})
export class BackButtonComponent {

    constructor(private location: Location) { }

    goBack(): void {
        this.location.back();
      } 
}