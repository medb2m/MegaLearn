import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { CardMethodComponent } from './card/card-method.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';


const routes: Routes = [
  
  {
<<<<<<< HEAD
    path: '', component: LayoutComponent,
=======
    path: '', component: LayoutComponent,data: { skipBreadcrumb: true },
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
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
