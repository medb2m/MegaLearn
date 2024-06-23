// claim.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaimService } from '@app/_services/claim.service';  // Ajuste le chemin d'importation si nécessaire
import { Claim } from '@app/_models/claim';  // Ajuste le chemin d'importation si nécessaire

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  claims: Claim[] = [];
  claimForm: FormGroup;

  constructor(private claimService: ClaimService, private formBuilder: FormBuilder) { 
    this.claimForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllClaims();
  }

  loadAllClaims() {
    this.claimService.getAll().subscribe(claims => {
      this.claims = claims;
    });
  }

  onSubmit() {
    if (this.claimForm.valid) {
      const formData = new FormData();
      formData.append('title', this.claimForm.get('title')?.value);
      formData.append('description', this.claimForm.get('description')?.value);

      this.claimService.create(formData).subscribe(response => {
        // Handle success
        console.log('Claim created successfully', response);
        this.loadAllClaims();  // Reload the claims list
        this.claimForm.reset(); // Reset the form after successful submission
      }, error => {
        // Handle error
        console.error('Error creating claim', error);
      });
    }
  }
}