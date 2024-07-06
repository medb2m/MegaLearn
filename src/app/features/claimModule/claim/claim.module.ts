import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


<<<<<<< HEAD
import { ClaimComponent } from './list/claim.component';
=======
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
>>>>>>> siwarMerge
import { LayoutComponent } from './layout';
import { SharedModule } from '@app/shared';
import { ClaimRoutingModule } from './claim-routing.module';
import { ChatComponent } from './chat/chat.component';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
import { ChatAppComponent } from './chat copy/chatapp.component';
>>>>>>> siwarMerge



@NgModule({
  declarations: [
<<<<<<< HEAD
    ClaimComponent,
    LayoutComponent,
    ChatComponent,
=======
    ListComponent,
    DetailsComponent,
    LayoutComponent,
    ChatComponent,
    ChatAppComponent,
  
>>>>>>> siwarMerge
    
  ],
  imports: [
    CommonModule,
    ClaimRoutingModule,
<<<<<<< HEAD
    SharedModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
=======
    SharedModule
>>>>>>> siwarMerge
  ]
})
export class ClaimModule { }
