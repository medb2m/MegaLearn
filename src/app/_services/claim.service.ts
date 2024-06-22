import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '@app/_models/claim';  // Assurez-vous que le chemin vers le modèle Claim est correct

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ClaimService {
    private baseUrl = `${environment.apiUrl}/claim`;

    constructor(private http: HttpClient) { }

    create(claim: FormData): Observable<any> {
        return this.http.post(this.baseUrl, claim);
    }

    getAll(): Observable<Claim[]> {
        return this.http.get<Claim[]>(this.baseUrl);
    }

    getById(claimId: string): Observable<Claim> {
        return this.http.get<Claim>(`${this.baseUrl}/${claimId}`);
    }

    update(claimId: string, claim: FormData): Observable<Claim> {
        return this.http.put<Claim>(`${this.baseUrl}/${claimId}`, claim);
    }

    delete(claimId: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${claimId}`);
    }
}