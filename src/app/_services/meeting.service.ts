import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from '@app/_models/meeting';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private apiUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  getById(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.apiUrl}/${id}`);
  }

  update(id: string, meeting: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.apiUrl}/${id}`, meeting);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllForEvent(eventId: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/event/${eventId}`);
  }
}
