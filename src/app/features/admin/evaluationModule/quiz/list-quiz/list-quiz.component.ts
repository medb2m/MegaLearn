import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService, QuizService } from '@app/_services';
import { Quiz } from '@app/_models';
import { Router } from '@angular/router';

@Component({
  selector: 'list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent {
  quizz: Quiz[] = [];
  loading = false;
  searchText = ''
  quizCreator !: string

  constructor(
    private quizService: QuizService,
    private alertService: AlertService,
    private router : Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.quizService.getAll()
      .pipe(first())
      .subscribe({
        next: (quizzes) => {
          this.quizz = quizzes;
          this.loading = false;
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  deleteQuiz(Q: Quiz) {
    console.log('le ID : ', Q._id)
    const quiz = this.quizz.find(x => x._id === Q._id);
    //console.log(quiz._id)
    this.quizService.delete(quiz!._id)
      .pipe(first())
      .subscribe(() => {
        this.quizz = this.quizz!.filter(x => x._id !== quiz!._id);
      });
  }

  createQuiz(courseId: string) {
    console.log('courseId '+courseId)
      this.router.navigate(['/admin/quiz/add'], { queryParams: { courseId: courseId } });
    
  }


  goto(path : any){
    this.router.navigate([`admin/quiz/${path}`])
  }
}
