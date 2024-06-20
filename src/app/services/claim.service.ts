// claim.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../models/claims.js'; // Define Claim interface or model as per your schema

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = `http://localhost:4000/claims`; // Replace with your backend API URL

  constructor(private http: HttpClient) {}


  createClaim(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(`${this.apiUrl}`, claim);
  }
}
