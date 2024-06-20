import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClaimService } from '../services/claim.service';
import { Claim } from '../models/claims';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css'],

})

export class ClaimComponent {
  title: string = '';
  description: string = '';
  claim:Claim = new Claim("","","")
  constructor(private messageService: MessageService, private cdr: ChangeDetectorRef,private claimservice: ClaimService) { }
  ngOnInit() {

  }
  updateTitle(event: any) {
    this.title = event.target.value;
    this.claim.title = this.title 
  }

  updateDescription(event: any) {
    this.description = event.target.value;
    this.claim.description = this.description
  }
  
  showError() {
    if (this.title == "" || this.description == "")
      this.messageService.add({ severity: 'error', detail: 'please fill in the inputs', life: 1500 });
    this.claimservice.createClaim(this.claim)
    console.log(this.claim)

  }
  check() {
    console.log(this.claim)
  }
}
