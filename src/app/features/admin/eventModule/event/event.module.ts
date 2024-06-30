import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { EventRoutingModule } from './event-routing.module';
import { SharedModule } from '@app/shared';
import { AddEditEventComponent } from './add-edit-event';
import { ListEventsComponent } from './list-events';
import { MeetingComponent } from './meetings';
import { ParticipantComponent } from './participant/participant.component';
import { VideoChatComponent } from './video-chat/video-chat.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EventRoutingModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ListEventsComponent,
        AddEditEventComponent,
        MeetingComponent,
        ParticipantComponent,
        VideoChatComponent
    ]
})
export class EventModule { }