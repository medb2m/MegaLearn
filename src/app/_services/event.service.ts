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

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  getByUser(){
    return this.http.get<Event[]>(`${this.apiUrl}/user`);
  }

<<<<<<< HEAD
  create(event: FormData): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/create`, event);
  }

  update(id: any, event: FormData): Observable<Event> {
=======
  create(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/create`, event);
  }

  update(id: string, event: FormData): Observable<Event> {
>>>>>>> siwarMerge
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  delete(id: string) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addParticipant(eventId: string, participantId: string): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/addparticipant/${eventId}/${participantId}`, {});
  }

  join(eventId: string): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/${eventId}/join`, {});
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

  getPendingParticipants(eventId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${eventId}/participants/pending`);
  }
<<<<<<< HEAD

  getUserStatus(eventId: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/events/${eventId}/user-status`);
  }
=======
>>>>>>> siwarMerge
}
