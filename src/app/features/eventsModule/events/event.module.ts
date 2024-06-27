import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout';
import { SharedModule } from '@app/shared';
import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './list';



@NgModule({
  declarations: [
    LayoutComponent,
    EventListComponent
  
    
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule
  ]
})
export class EventModule { }
