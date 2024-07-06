import { Component } from '@angular/core';

import { AccountService } from '@app/_services';

<<<<<<< HEAD
@Component({ templateUrl: 'details.component.html' , styleUrls :['details.component.css'] })
=======
@Component({ templateUrl: 'details.component.html' })
>>>>>>> siwarMerge
export class DetailsComponent {
    account = this.accountService.accountValue;

    constructor(private accountService: AccountService) { }
}