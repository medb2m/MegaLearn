import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { EventRoutingModule } from './event-routing.module';
import { SharedModule } from '@app/shared';
import { AddEditEventComponent } from './add-edit-event';
import { ListEventsComponent } from './list-events';
import { MeetingComponent } from './meetings';

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
        MeetingComponent
    ]
})
export class EventModule { }