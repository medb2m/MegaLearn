// custom-socket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private socket = io.connect('http://localhost:4000');

  joinRoom(data : any){

      this.socket.emit('join',data);
  }
  leaveRoom(data  : any){
      this.socket.emit('leave',data)
  }
  newUserJoined()
  {
      let observable = new Observable<{user:String, message:String,count:String}>(observer=>{
          this.socket.on('new user joined', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

 userLeftRoom(){
     let observable = new Observable<{user:String,message:String}>(observer=>{
         this.socket.on('left room',(data)=>{
             observer.next(data);
         });
         return () => {this.socket.disconnect();}
     });

     return observable;

 }


 sendMessage(data : any){
     this.socket.emit('message',data)

 }
  newMessageReceived(){
      let observable = new Observable<{user:String,message:String}>(observer=>{
          this.socket.on('new message',(data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

//getting total number of users 
totalUsers(){
 
   let observable = new Observable<{count:string}>(observer=>{
       this.socket.on('usercount',(data)=>{
           observer.next(data);
       });
       return () => {this.socket.disconnect();}
   });
   return observable;

}
}
