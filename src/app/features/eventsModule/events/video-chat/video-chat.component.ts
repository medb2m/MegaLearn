import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '@app/_services';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  private socket: any;
  private localStream: MediaStream | null = null;
  private peerConnection: RTCPeerConnection | null = null;
  private roomId: string = '';

  constructor(
    private route: ActivatedRoute,
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
      });
    }
  }

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
  }
}
