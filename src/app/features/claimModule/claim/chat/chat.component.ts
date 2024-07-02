import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountService } from '@app/_services';
import {  Socket,io } from 'socket.io-client';


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
  messages: ChatMessage[] = [];
  newMessage: string = '';
  roomId: string = 'defaultRoom'; // Example room ID, adjust as needed

  constructor(public socket: Socket, private http: HttpClient, private accountService : AccountService) {}

  ngOnInit() {

    const token = this.accountService.accountValue?.jwtToken;
    console.log('token ' + token)

    if (!token) {
      console.error('No token found. User might not be authenticated.');
      return;
    }

    this.socket = io('http://localhost:4000', {
      auth: {
        token
      }
    }); 
    this.socket.connect();

    // Join a room
    this.socket.emit('join', this.roomId);

    // Listen for messages from the server
    this.socket.on('message', (message: ChatMessage) => {
      this.messages.push({ content: message.content, roomId: message.roomId });
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const message: ChatMessage = { content: this.newMessage, roomId: this.roomId };
      this.socket.emit('sendMessage', message);
      this.newMessage = '';
    }
  }
}
