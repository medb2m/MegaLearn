import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { SharedModule } from '@app/shared';
import { ClaimComponent } from './claim';
import { ChatComponent } from './chat';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimModalComponent } from './claimModal';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ClaimRoutingModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ClaimComponent,
        ChatComponent,
        ClaimModalComponent
    ]
})
export class ClaimModule { }