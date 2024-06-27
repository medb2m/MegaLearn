import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '@app/_services/courses.service';
import { Course } from '@app/_models/course';
import { AccountService, AlertService, QuizService } from '@app/_services';
import { Account, Role } from '@app/_models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  course: Course | undefined;
  category : any
  instructor : any
  chapter : any
  account ?: Account | null;
  Role = Role;
  isEnrolled: boolean = false;
  userId ?: string

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private alertService : AlertService,
    private router : Router,
    private accountService : AccountService,
    private quizService : QuizService
  ) { }

  ngOnInit() {
    this.accountService.account.subscribe(x => {
      this.account = x
      if (this.account){
        this.userId = this.account.id
      }
    });
    

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.coursesService.getById(id).subscribe(course => {
        if (course && !course.sections) {
          course.sections = [];
        }
        this.course = course
        this.category = course.category
        this.instructor = `${course.creator.firstName} ${course.creator.lastName}`
        this.chapter = course.sections
      });
      this.coursesService.isEnrolled(id).subscribe( res => this.isEnrolled = res)
    }
  }

  enroll(courseId: string | undefined) {
    if (courseId) {
      this.coursesService.enrollInCourse(courseId).subscribe(
        response => {
          // Affichez une alerte de succès
          this.alertService.success('Enrolled successfully');

          // Redirigez l'utilisateur vers le chemin souhaité
          this.router.navigate(['/courses/mycourses']);
        },
        error => {
          // Affichez une alerte d'erreur
          this.alertService.error('Enrollment failed');
          console.error('Enrollment failed', error);
        }
      );
    } else {
      console.error('Course ID is undefined');
    }
  }
  discount(price: any) {
    return price * 0.1
  }

  showContent(){
    if(this.account?.role === Role.Admin){
      this.isEnrolled = !this.isEnrolled
    }
  }

  proceedToPayment(courseId: string | undefined) {
    if (courseId) {
      this.router.navigate(['/pay/method'], { queryParams: { courseId : courseId } });
    } else {
      console.error('Course ID is undefined');
    }
  }

  takeQuiz(id : any){
    this.router.navigate([`/courses/take/${id}`]);
  }
  
  
}
