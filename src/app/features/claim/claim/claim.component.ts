
import { Component, OnInit } from '@angular/core';
import { ClaimService } from '@app/_services/claim.service';  // Ajuste le chemin d'importation si nécessaire
import { Claim } from '@app/_models/claim';  // Ajuste le chemin d'importation si nécessaire


@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})



  export class ClaimComponent implements OnInit {
    claims: Claim[] = [];
  
    constructor(private claimService: ClaimService) { }
  
    ngOnInit(): void {
      this.loadAllClaims();
    }
  
    loadAllClaims() {
      this.claimService.getAll().subscribe(claims => {
        this.claims = claims;
      });
    }




}
