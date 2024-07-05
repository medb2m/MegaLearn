import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Claim, Entity } from '@app/_models';
import { ClaimService, EntityService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from '../chat/chat.component';
import { ClaimModalComponent } from '../claimModal';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent {
  claims: Claim[] = [];
  claimForm!: FormGroup;
  currentClaimId: string | null = null;
  chatMessage: string = '';

  constructor(
    private claimService: ClaimService, 
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.claimForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.loadAllClaims();
  }

  loadAllClaims() {
    this.claimService.getAll().subscribe(claims => {
      console.log('Claims loaded:', claims);
      this.claims = claims;
    });
  }
  

  onSubmit() {
    if (this.claimForm.valid) {
      const titleValue = this.claimForm.get('title')?.value?.toString(); // Ensure it's a string
      const descriptionValue = this.claimForm.get('description')?.value?.toString(); // Ensure it's a string
      const formData = new FormData();
      formData.append('title', titleValue);
      formData.append('description', descriptionValue);
      formData.forEach((value, key) => {
        console.log(key + " " + value)
      });
      if (this.currentClaimId) {
        this.claimService.update(this.currentClaimId, formData).subscribe(response => {
          console.log('Claim updated successfully', response);
          this.loadAllClaims();
          this.claimForm.reset();
          this.currentClaimId = null;
        }, error => {
          console.error('Error updating claim', error);
        });
      } else {
        this.claimService.create(formData).subscribe(response => {
          console.log('Claim created successfully', response);
          this.loadAllClaims();
          this.claimForm.reset();
        }, error => {
          console.error('Error creating claim', error);
        });
      }
    }
  }

  editClaim(claimId: string) {
    const modalRef = this.modalService.open(ClaimModalComponent);
    modalRef.componentInstance.claimId = claimId;
    modalRef.result.then((result) => {
      if (result) {
        this.loadAllClaims();
      }
    }, (reason) => {
      console.log('Modal dismissed:', reason);
    });
  }

openChatModal(id : string){
  const modalRef = this.modalService.open(ChatComponent);
  modalRef.componentInstance.claimId = id
}
}
