import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    this.initWebRTC();
  }

  async initWebRTC() {
    this.socket = io('http://localhost:4000');

    this.socket.emit('join', this.roomId);

    this.socket.on('user-joined', async (userId: string) => {
      this.createOffer();
    });

    this.socket.on('signal', async (data: any) => {
      if (data.type === 'offer') {
        await this.createAnswer(data);
      } else if (data.type === 'answer') {
        this.peerConnection?.setRemoteDescription(new RTCSessionDescription(data));
      } else if (data.type === 'candidate') {
        this.peerConnection?.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
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
        this.socket.emit('signal', { type: 'candidate', candidate: event.candidate, room: this.roomId });
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteVideo.nativeElement.srcObject = event.streams[0];
    };

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        this.peerConnection?.addTrack(track, this.localStream as MediaStream);
      });
    }
  }

  async createOffer() {
    const offer = await this.peerConnection?.createOffer();
    await this.peerConnection?.setLocalDescription(offer);
    this.socket.emit('signal', { type: 'offer', sdp: offer?.sdp, room: this.roomId });
  }

  async createAnswer(offer: any) {
    await this.peerConnection?.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection?.createAnswer();
    await this.peerConnection?.setLocalDescription(answer);
    this.socket.emit('signal', { type: 'answer', sdp: answer?.sdp, room: this.roomId });
  }
}
