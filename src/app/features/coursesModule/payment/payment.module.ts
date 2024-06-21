import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { CardMethodComponent } from './card/card-method.component';
import { LayoutComponent } from './layout';
import { NgxMaskModule } from 'ngx-mask';
//import { PlyrModule } from 'ngx-plyr';

@NgModule({
  declarations: [
    PaymentMethodComponent,
    CardMethodComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ]
})
export class PaymentModule { }
