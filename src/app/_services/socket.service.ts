// custom-socket.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket {
  constructor(private accountService: AccountService) {
    super({ url: environment.apiUrl, options: { autoConnect: false } });
    this.initializeSocket();
  }

  private initializeSocket(): void {
    const token = this.accountService.accountValue?.jwtToken;

    if (token) {
      io('http://localhost:4000', {
        auth: {
          token
        } ,
        transports: ['websocket'] 
      });
      this.connect();
    } 
      
  }

  public reconnectWithToken(): void {
    const token = this.accountService.accountValue?.jwtToken;
    if (token) {
        io('ws://localhost:4000', {
            auth: {
              token
            },
            transports: ['websocket'] 
          });
      this.disconnect();
      console.log('sar discont')
      this.connect();
    }
  }
}
