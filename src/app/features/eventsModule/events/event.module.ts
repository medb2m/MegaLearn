import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout';
import { SharedModule } from '@app/shared';
import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './list';
import { EventdetailsComponent } from './details';
import { VideoChatComponent } from './video-chat/video-chat.component';



@NgModule({
  declarations: [
    LayoutComponent,
    EventListComponent,
    EventdetailsComponent,
    VideoChatComponent
  
    
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule
  ]
})
export class EventModule { }
