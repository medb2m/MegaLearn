import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { LayoutComponent } from './layout';
import { SharedModule } from '@app/shared';
import { ClaimRoutingModule } from './claim-routing.module';
import { ChatComponent } from './chat/chat.component';
import { ChatAppComponent } from './chat copy/chatapp.component';



@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    LayoutComponent,
    ChatComponent,
    ChatAppComponent,
  
    
  ],
  imports: [
    CommonModule,
    ClaimRoutingModule,
    SharedModule
  ]
})
export class ClaimModule { }
