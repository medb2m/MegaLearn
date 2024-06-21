import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Certificate } from '@app/_models/certificates';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private apiUrl = `${environment.apiUrl}/certificate`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCertificatesByUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCertificatesById(id : any): Observable<Certificate> {
    return this.http.get<Certificate>(`${this.apiUrl}/`+id);
  }

  downloadCertificate(certificateId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${certificateId}`, { responseType: 'blob' });
  }


}
