<<<<<<< HEAD
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chat } from '@app/_models';
import { AccountService, ClaimService } from '@app/_services';
import { SocketService } from '@app/_services/socket.service';

=======
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
>>>>>>> siwarMerge

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
<<<<<<< HEAD
  @Input() claimId!: string;
    message : string = ''
    messages : any[] = []
    token?:string
    pdp?:string
    username!:string
    userID!:string
    incomingMsg : any

    @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;
    
    constructor(
      private socket: SocketService, 
      private accountService : AccountService, 
      private claimService : ClaimService) {
      this.token = this.accountService.accountValue!.jwtToken;
      this.pdp = this.accountService.accountValue?.image;
      this.username = this.accountService.accountValue!.username;
      this.userID = this.accountService.accountValue!.id;
=======
    message : string = ''
    messages : any[] = []
    roomId: string = 'defaultRoom'; // Example room ID, adjust as needed
    token?:string
    pdp?:string
    incomingMsg : any
    
    constructor(private socket: SocketService, private accountService : AccountService, private so : Socket) {
      this.token = this.accountService.accountValue?.jwtToken;
      this.pdp = this.accountService.accountValue?.image;
>>>>>>> siwarMerge
    }

    ngOnInit() {
      console.log('pic link ' + this.pdp)
<<<<<<< HEAD
      console.log('USER ID ' + this.userID)
      this.loadMessages();
      

      this.socket.on('message', (message : string, pdp : string, time : any, senderName: string) => {
        this.incomingMsg = {};
        this.incomingMsg.message = message
        this.incomingMsg.senderName = senderName
=======
      

      this.socket.on('message', (message : string, pdp : string, time : any) => {
        this.incomingMsg = {};
        this.incomingMsg.message = message
>>>>>>> siwarMerge
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
<<<<<<< HEAD

    ngAfterViewChecked() {
      this.scrollToBottom();
    }

    loadMessages() {
      this.claimService.getMessages(this.claimId).subscribe(
          (data: any[]) => {
              this.messages = data.map((message) => {
                  // Assuming `message.senderID` is an object with an `image` property
                  return {
                      ...message,
                      pdp: message.senderID.image,
                  };
              });
          },
          (error) => {
              console.error('Error fetching messages', error);
          }
      );
  }
  
=======
>>>>>>> siwarMerge
    
    
    sendMessage():void {
      if(this.token){
<<<<<<< HEAD
        let time = this.getCurrentTime()
        const formData = new FormData();
        formData.append('senderID', this.userID)
        formData.append('senderName', this.username)
        formData.append('message', this.message)
        formData.append('time', time)
        formData.append('claimId', this.claimId)
        this.claimService.addMessage(formData).subscribe(() => {
          console.log(' message evoyer au backend')
        })
        if(this.message.trim() !== ''){
=======
        if (this.message.trim() !== '') {
          let time = this.getCurrentTime()
>>>>>>> siwarMerge
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
<<<<<<< HEAD
      let chminutes : string = '0'
  
      // Ajoute un zéro devant les minutes si elles sont inférieures à 10
      if (minutes < 10) {
        chminutes += minutes.toString()
      }else {
        chminutes = minutes.toString()
      }
  
      let formattedTime = hours + ":" + chminutes;
      return formattedTime;
  }

  private scrollToBottom(): void {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Scroll to bottom error:', err);
    }
  }
=======
      let chminutes : string
  
      // Ajoute un zéro devant les minutes si elles sont inférieures à 10
      if (minutes < 10) {
          chminutes = "0" + minutes;
      }
  
      let formattedTime = hours + ":" + minutes;
      return formattedTime;
  }
    

>>>>>>> siwarMerge
    ngOnDestroy() {
      this.socket.disconnect(); // Disconnect socket
    }
}
