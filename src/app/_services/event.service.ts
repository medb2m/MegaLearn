import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Event, Meeting } from '@app/_models';

@Injectable({
  providedIn: 'root',
})
export class EventService {
    private apiUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  create(event: FormData): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  update(id: string, event: FormData): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addParticipant(eventId: string, participantId: string): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/addparticipant/${eventId}/${participantId}`, {});
  }

  approveParticipant(eventId: string, participantId: string): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${eventId}/participants/${participantId}/approve`, {});
  }

  disapproveParticipant(eventId: string, participantId: string): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${eventId}/participants/${participantId}/disapprove`, {});
  }

  createMeeting(eventId: string, meeting: any): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.apiUrl}/${eventId}/meeting`, meeting);
  }
}
