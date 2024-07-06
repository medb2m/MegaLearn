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
    super({ url: 'ws://localhost:4000', options: { autoConnect: false } });
    this.initializeSocket();
  }

  private initializeSocket(): void {
    const token = this.accountService.accountValue?.jwtToken;

    if (token) {
      const sok = io('http://localhost:4000/', {
        auth: {
          token
        }/* ,
        query : {
            token
        },
        transports: ['websocket']  */
      });
      sok.connect();
      this.connect()
    } 
      
  }

  public reconnectWithToken(): void {
    const token = this.accountService.accountValue?.jwtToken;
    if (token) {
      const sok = io('ws://localhost:4000', {
            auth: {
              token
            },
            query : {
                token
            },
            transports: ['websocket'] 
          });
      sok.disconnect();
      console.log('sar discont')
      sok.connect();
    }
  }
}
