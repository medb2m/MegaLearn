import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

interface WebSocketMessage {
    type: string;
    sender?: string;
    target?: string;
    sdp?: any;
    candidate?: RTCIceCandidate;
  }

@Injectable({
  providedIn: 'root'
})
export class MeetingSocketService {
  private socket: Socket;
  private messageSubject = new Subject<any>();

  constructor() {
    this.socket = io('http://172.20.10.2:4000'); 
    this.socket.on('message', (data: WebSocketMessage) => this.messageSubject.next(data));
  }

  connect() {
    this.socket.connect();
    this.socket.on('message', (data: any) => this.messageSubject.next(data));
  }

  disconnect() {
    this.socket.disconnect();
  }

  send(data: any) {
    this.socket.emit('message', data);
  }

  onMessage(): Observable<WebSocketMessage> {
    return this.messageSubject.asObservable();
  }
}
