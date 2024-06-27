import { Component, Input, SimpleChanges } from '@angular/core';
//import { PlyrModule } from 'ngx-plyr';

interface VideoSource {
  src: string;
  type: string;
}

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent {
  @Input() sections: any[] = [];
  currentVideo: any;

   ngOnInit() {
    if (this.sections.length > 0) {
      this.currentVideo = this.sections[0];
    }
  } 

  videoSources: VideoSource[] = [];
  plyrOptions = {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    autoplay: true
  };

  ngOnChanges(changes : SimpleChanges){
    if(changes['sections'] && changes['sections'].currentValue){
      this.currentVideo = changes['sections'].currentValue[0];
      this.videoSources = [
        {
          src: this.currentVideo.videoURL,
          type: 'video/mp4'
        }
      ];
    }
  } 

  playVideo(index: number) {
    this.currentVideo = this.sections[index];
    this.videoSources = [
      {
        src: this.currentVideo.videoURL,
        type: 'video/mp4'
      }
    ];
    console.log(this.currentVideo.videoURL)
  }
}
