import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Claim, Entity } from '@app/_models';
import { ClaimService, EntityService } from '@app/_services';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-claim',
  templateUrl: './claim-modal.component.html',
  styleUrls: ['./claim-modal.component.css']
})
export class ClaimModalComponent {
  @Input() claimId!: string;
  claimForm!: FormGroup;
  claim!: Claim;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private claimService: ClaimService
  ) {}

  ngOnInit(): void {
    this.claimForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.loadClaimDetails();
  }

  loadClaimDetails() {
    this.claimService.getById(this.claimId).subscribe((claim: Claim) => {
      this.claim = claim;
      this.claimForm.patchValue({
        title: claim.title,
        description: claim.description,
        status: claim.status
      });
    });
  }

  save() {
    if (this.claimForm.valid) {
      const formData = this.claimForm.value;
      this.claimService.update(this.claimId, formData).subscribe(response => {
        console.log('Claim updated successfully', response);
        this.activeModal.close(response);
      }, error => {
        console.error('Error updating claim', error);
      });
    }
  }
}