import { Component } from '@angular/core';
import { AccountService } from '@app/_services';
import { SocketService } from '@app/_services/socket.service';
import { Socket } from 'ngx-socket-io';


interface Message {
  content: string;
  isSent: boolean;
}

interface ChatMessage {
  content: string;
  roomId: string;
  senderID?: string;  // Optional, if you want to use it later
  senderName?: string;  // Optional, if you want to use it later
  timestamp?: Date;  // Optional, if you want to use it later
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
    message : string = ''
    messages : any[] = []

    constructor(private socket: SocketService, private accountService : AccountService, private so : Socket) {}

    ngOnInit() {
      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });
  
      this.socket.on('disconnect', (reason : any) => {
        console.log('Disconnected from WebSocket server:', reason);
      }); 
  
      this.socket.on('wallah', (message: string) => {
        this.messages.push(message);
      });
      this.socket.on("connect_error", (err : any) => {
        // the reason of the error, for example "xhr poll error"
        console.log(err.message);
      
        // some additional description, for example the status code of the initial HTTP response
        console.log(err.description);
      
        // some additional context, for example the XMLHttpRequest object
        console.log(err.context);
      });
  
      // Reconnect with the token
      //this.socket.reconnectWithToken();
    }
    test : string = 'hello'
    sendMessage():void {
      if (this.message.trim() !== ''){
        this.socket.emit('wallah', this.test);
        this.message = ''
      }
    } 

    ngOnDestroy() {
      this.socket.disconnect(); // Disconnect socket
    }
}
