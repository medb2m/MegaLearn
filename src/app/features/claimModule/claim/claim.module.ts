import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ClaimComponent } from './list/claim.component';
import { LayoutComponent } from './layout';
import { SharedModule } from '@app/shared';
import { ClaimRoutingModule } from './claim-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClaimComponent,
    LayoutComponent,
    ChatComponent,
    
  ],
  imports: [
    CommonModule,
    ClaimRoutingModule,
    SharedModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClaimModule { }
