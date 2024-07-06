import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '@app/_services';


@Component({
  selector: 'app-chat',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css'],
  providers:[ChatService]
})
export class ChatAppComponent {
  onlineUser:any=[]
  u!:string;
  roomsForChat:any=['Angular','React','Vue']
  joined:any=false;
  messageArray:Array<{user:String,message:String}> = [];
  
  join_message:any ;
  leave_message:any;
  count:any;
  userJoined!:string;
  roomJoined!:string;
//reactive form
  chatForm!:FormGroup;

  constructor(private _chatService:ChatService,private fb:FormBuilder){
    this._chatService.newUserJoined()
    .subscribe(data=> this.messageArray.push(data));

    this._chatService.userLeftRoom()
    .subscribe(data=> this.messageArray.push(data));

    this._chatService.newMessageReceived()
    .subscribe(data=> this.messageArray.push(data));

    this._chatService.totalUsers()
    .subscribe((data)=>{
      this.count=data.count

    })
  }
  join(){
    this.joined=true
    this.leave_message=null
    this.join_message="You have joined the room " +this.roomJoined
    this._chatService.joinRoom({user:this.chatForm.get('user')?.value,room:this.chatForm.get('room')?.value});
  }
  leave(){
    this.joined=false;
    this.join_message=null
    this.leave_message="You have  left the room "+this.roomJoined
    this._chatService.leaveRoom({user:this.chatForm.get('user')?.value,room:this.chatForm.get('room')?.value});
  }
    
  sendMessage(){
    this._chatService.sendMessage({user:this.chatForm.get('user')?.value,room:this.chatForm.get('room')?.value,message:this.chatForm.get('messageText')?.value});
  }
  userInfo : any;
  ngOnInit() { 
    this.userInfo=history.state;
    this.u=this.userInfo.email;
    this.chatForm=this.fb.group({
     user:["",Validators.required],
     room:["",Validators.required],
     messageText:[""]
    })
  }

  // Choose room using select dropdown
changeRoom(e : any) {
  console.log(e.value)
  this.room?.setValue(e.target.value, {
    onlySelf: true
  })
}
get room() {
  return this.chatForm.get('room');
}
//to get list of online users
getOnlineUsers(){

}


    ngOnDestroy() {
      //this.socket.disconnect(); // Disconnect socket
    }
}
