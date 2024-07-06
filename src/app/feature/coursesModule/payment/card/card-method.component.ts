import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, CoursesService } from '@app/_services';

@Component({
  selector: 'app-card-method',
  templateUrl: './card-method.component.html',
  styleUrls: ['./card-method.component.css']
})
export class CardMethodComponent {
  cardNumber: string = '';
  expirationDate: string = '';
  cvv: string = '';
  courseId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
  }

  submitPayment() {
    if (this.courseId) {
      let id = this.courseId
      this.coursesService.processPayment('creditCard', this.courseId).subscribe(
        response => {
          if (response.success) {
            this.alertService.success('Payment processed successfully');
            this.coursesService.enrollInCourse(id).subscribe()
            this.router.navigate(['/courses/mycourses']);
          } else {
            this.alertService.error('Payment failed');
          }
        },
        error => {
          this.alertService.error('Payment failed');
          console.error('Payment failed', error);
        }
      );
    } else {
      console.error('Course ID is undefined');
    }
  }
}
