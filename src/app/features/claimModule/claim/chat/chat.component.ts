import { Component } from '@angular/core';
import { AccountService } from '@app/_services';
import { SocketService } from '@app/_services/socket.service';
import { Socket } from 'ngx-socket-io';
import { Message  } from '@app/_models';

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
    roomId: string = 'defaultRoom'; // Example room ID, adjust as needed
    token?:string
    pdp?:string
    incomingMsg : any
    
    constructor(private socket: SocketService, private accountService : AccountService, private so : Socket) {
      this.token = this.accountService.accountValue?.jwtToken;
      this.pdp = this.accountService.accountValue?.image;
    }

    ngOnInit() {
      console.log('pic link ' + this.pdp)
      

      this.socket.on('message', (message : string, pdp : string, time : any) => {
        this.incomingMsg = {};
        this.incomingMsg.message = message
        this.incomingMsg.pdp = pdp
        this.incomingMsg.time = time
        this.messages.push(this.incomingMsg);
      });

      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });
  
      this.socket.on('disconnect', (reason : any) => {
        console.log('Disconnected from WebSocket server:', reason);
      }); 
      this.socket.on("connect_error", (err : any) => {
        // the reason of the error, for example "xhr poll error"
        console.log(err.message);
      
        // some additional description, for example the status code of the initial HTTP response
        console.log(err.description);
      
        // some additional context, for example the XMLHttpRequest object
        console.log(err.context);
      });

      let currentDate = this.getCurrentTime()
      console.log(currentDate);
      // Reconnect with the token
      //this.socket.reconnectWithToken();
    }
    
    
    sendMessage():void {
      if(this.token){
        if (this.message.trim() !== '') {
          let time = this.getCurrentTime()
          this.socket.emit('message',this.token, this.message, time, this.pdp);
          this.message = ''
        }
      } else {
        console.log('user not connected ')
      }
    }

    getCurrentTime() {
      let currentDate = new Date();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let chminutes : string
  
      // Ajoute un zéro devant les minutes si elles sont inférieures à 10
      if (minutes < 10) {
          chminutes = "0" + minutes;
      }
  
      let formattedTime = hours + ":" + minutes;
      return formattedTime;
  }
    

    ngOnDestroy() {
      this.socket.disconnect(); // Disconnect socket
    }
}
