import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Chat, Claim } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = `${environment.apiUrl}/claim`;

  constructor(private http: HttpClient) { }

  addMessage(msg : FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/msg`, msg);
  }

  getMessages(claimId : string): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/msg/${claimId}`);
  }
  create(claim: FormData): Observable<any> {
    return this.http.post(this.apiUrl, claim);
}

getAll(): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.apiUrl);
}

getById(claimId: string): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiUrl}/${claimId}`);
}

update(claimId: string, claim: FormData): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/${claimId}`, claim);
}

delete(claimId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${claimId}`);
}
}