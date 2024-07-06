<<<<<<< HEAD
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService, SocketService } from '@app/_services';
import { MeetingSocketService } from '@app/_services/meetingSocket.service';
import { io } from 'socket.io-client';

interface WebSocketMessage {
  type: string;
  sender?: string;
  target?: string;
  sdp?: any;
  candidate?: RTCIceCandidate;
}

=======
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '@app/_services';
import { io } from 'socket.io-client';

>>>>>>> siwarMerge
@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
<<<<<<< HEAD
export class VideoChatComponent implements OnInit, OnDestroy {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideos', { read: ElementRef }) remoteVideos!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  private pc: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remotePeerId: string = '';
=======
export class VideoChatComponent implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  private socket: any;
  private localStream: MediaStream | null = null;
  private peerConnection: RTCPeerConnection | null = null;
>>>>>>> siwarMerge
  private roomId: string = '';

  constructor(
    private route: ActivatedRoute,
<<<<<<< HEAD
    private accountService: AccountService,
    private renderer: Renderer2,
    private webSocketService: MeetingSocketService
  ) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Room ID:', this.roomId);
    this.initWebRTC();
    this.handleWebSocketMessages();
    this.webSocketService.connect(); // Connect to WebSocket server
    this.JoinRoom();
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect(); // Disconnect from WebSocket server
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop()); // Stop all tracks
    }
  }

  JoinRoom() {
    this.webSocketService.send({ type: 'join', roomId: this.roomId });
  }

  initWebRTC() {
    this.pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        // Add more STUN/TURN servers as needed
      ]
    });

    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE candidate:', event.candidate);
        this.webSocketService.send({
          target: this.remotePeerId,
          type: 'candidate',
          candidate: event.candidate
        });
      }
    };

    this.pc.ontrack = (event) => {
      console.log('Adding track:', event.track);
      const [remoteStream] = event.streams;
      const remoteVideo = this.remoteVideo.nativeElement;
      remoteVideo.srcObject = remoteStream;
    };

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      const localVideo = this.localVideo.nativeElement;
      localVideo.srcObject = stream;
      stream.getTracks().forEach((track) => this.pc?.addTrack(track, stream));
      this.localStream = stream;
    }).catch(error => {
      console.error('Error accessing media devices:', error);
    });
  }

  handleWebSocketMessages() {
    this.webSocketService.onMessage().subscribe(async (data: WebSocketMessage) => {
      if (!this.pc) return;

      if (data.type === 'offer') {
        try {
          this.remotePeerId = data.sender!;
          console.log('Received offer:', data);
          await this.pc.setRemoteDescription(new RTCSessionDescription(data.sdp));

          const answer = await this.pc.createAnswer();
          console.log('Created answer:', answer);

          await this.pc.setLocalDescription(answer);
          this.webSocketService.send({
            target: this.remotePeerId,
            type: 'answer',
            sdp: answer.sdp
          });
        } catch (err) {
          console.error('Error handling offer:', err);
        }
      } else if (data.type === 'answer') {
        try {
          console.log('Received answer:', data);
          await this.pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        } catch (err) {
          console.error('Error setting remote description from answer:', err);
        }
      } else if (data.type === 'candidate') {
        try {
          console.log('Received ICE candidate:', data.candidate);
          await this.pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (err) {
          console.error('Error adding received ICE candidate:', err);
        }
      }
    });
  }

  async startScreenShare() {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenStream.getTracks().forEach(track => {
        this.pc?.addTrack(track, screenStream);
      });
      this.localVideo.nativeElement.srcObject = screenStream;
      this.localStream?.getTracks().forEach(track => track.stop());
      this.localStream = screenStream;
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  }

  stopScreenShare() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.initWebRTC();
    }
  }

  stopCamera() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        if (track.kind === 'video') {
          track.enabled = !track.enabled;
        }
=======
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    this.initWebRTC();
  }

  async initWebRTC() {
    console.log('Initializing WebRTC');

    // Retrieve the token from local storage or wherever it is stored
    const token = this.accountService.accountValue?.jwtToken;
    console.log('token ' + token)

    if (!token) {
      console.error('No token found. User might not be authenticated.');
      return;
    }


    this.socket = io('http://192.168.1.4:4000', {
      auth: {
        token
      }
    });

    this.socket.on('connect_error', (err: any) => {
      console.error('Connection error:', err.message);
    });

    this.socket.emit('join', this.roomId);

    this.socket.on('user-joined', async (userId: string) => {
      console.log('User joined:', userId);
      this.createOffer();
    });

    /* this.socket.on('signal', async (data: any) => {
      console.log('Received signal:', data);
      if (data.type === 'offer') {
        await this.createAnswer(data);
      } else if (data.type === 'answer') {
        this.peerConnection?.setRemoteDescription(new RTCSessionDescription(data));
      } else if (data.type === 'candidate') {
        this.peerConnection?.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    }); */

    // With these separate listeners
    this.socket.on('offer', async (data: any) => {
      console.log('Received offer:', data);
      await this.createAnswer(data);
    });

    this.socket.on('answer', (data: any) => {
      console.log('Received answer:', data);
      this.peerConnection?.setRemoteDescription(new RTCSessionDescription(data));
    });

    this.socket.on('ice-candidate', (data: any) => {
      console.log('Received ICE candidate:', data);
      this.peerConnection?.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localVideo.nativeElement.srcObject = this.localStream;

    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE candidate:', event.candidate);
        this.socket.emit('ice-candidate', { target: this.roomId, candidate: event.candidate });
      }
    };

    this.peerConnection.ontrack = (event) => {
      console.log('Received remote track:', event.streams[0]);
      this.remoteVideo.nativeElement.srcObject = event.streams[0];
    };

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        console.log('Adding track:', track);
        this.peerConnection?.addTrack(track, this.localStream as MediaStream);
>>>>>>> siwarMerge
      });
    }
  }

<<<<<<< HEAD
  muteMicrophone() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        if (track.kind === 'audio') {
          track.enabled = !track.enabled;
        }
      });
    }
=======
  async createOffer() {
    console.log('hello')
    const offer = await this.peerConnection?.createOffer();
    await this.peerConnection?.setLocalDescription(offer);
    console.log('Created offer:', offer);
    this.socket.emit('offer', { target: this.roomId, sdp: offer?.sdp });
  }

  async createAnswer(offer: any) {
    await this.peerConnection?.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection?.createAnswer();
    await this.peerConnection?.setLocalDescription(answer);
    console.log('Created answer:', answer);
    this.socket.emit('answer', { target: this.roomId, sdp: answer?.sdp });
>>>>>>> siwarMerge
  }
}
