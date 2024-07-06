import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent {
  selectedPaymentMethod: string = '';
  courseId: any;
  
  paymentMethods = [
    { value: 'creditCard', name: 'Credit Card', image: 'assets/img/creditCard.png' },
    { value: 'paypal', name: 'PayPal', image: 'assets/img/PayPal.png' },
    { value: 'D17', name: 'D17', image: 'assets/img/d17.png' }
  ];
  
  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.courseId = params.get('courseId');
    });
  }
  
  submitPayment() {
    switch (this.selectedPaymentMethod) {
      case 'creditCard':
        this.router.navigate([`/pay/card/${this.courseId}`]);
        break;
      case 'paypal':
        this.router.navigate([`/pay/paypal/${this.courseId}`]);
        break;
      case 'bankTransfer':
        this.router.navigate([`/pay/bank-transfer/${this.courseId}`]);
        break;
      default:
        break;
    }
  }
}
