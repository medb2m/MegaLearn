import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { CardMethodComponent } from './card/card-method.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';


const routes: Routes = [
  
  {
    path: '', component: LayoutComponent,
    children: [
        { path: 'method', component: PaymentMethodComponent },
        { path: 'card/:id', component: CardMethodComponent },
        // other payment method
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
