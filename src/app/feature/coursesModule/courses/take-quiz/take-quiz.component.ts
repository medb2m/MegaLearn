import { Component, OnInit } from '@angular/core';
import { CoursesService } from '@app/_services/courses.service';
import { Course } from '@app/_models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, QuizService } from '@app/_services';
import { first } from 'rxjs';
import { Question } from '@app/_models';
import { Option } from '@app/_models/option';

@Component({
    selector: 'app-my-courses',
    templateUrl: './take-quiz.component.html',
    styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {

    form!: FormGroup;
  courseId!: string;
  quizTitle!: string;
  loading = false;
  submitted = false;
  score?: number;
  certificate?: string;
  quiz : any

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      questions: this.fb.array([])
    });

    this.loadQuiz();
  }

  get f() { return this.form.controls; }
  get questions() { return this.form.get('questions') as FormArray; }

  getOptions(questionIndex: number) {
    const question = this.questions.at(questionIndex);
    const options = question.get('options') as FormArray;
    return options.controls;
  }
  addQuestion(question?: any) {
    const questionForm = this.fb.group({
      questionText: [question?.questionText || '', Validators.required],
      selectedOption: [null, Validators.required],
      options: this.fb.array([])
    });

    if (question && question.options) {
      question.options.forEach((option: any) => {
        (questionForm.get('options') as FormArray).push(this.fb.group({
          optionText: [option.optionText, Validators.required],
          isCorrect:   [false]  //[option.isCorrect]
        }));
      });
    }

    this.questions.push(questionForm);
  }

  loadQuiz() {
    this.loading = true;
    this.quizService.getByCourseId(this.courseId)
      .pipe(first())
      .subscribe(quiz => {
        this.quiz = quiz;
        //console.log(quiz)
        quiz.questions.forEach((question: any) => {
          this.addQuestion(question);
        });
        this.loading = false;
      });
  }

  onSubmit() {
    console.log('7')
    this.submitted = true;
    console.log('6')
    /* if (this.form.invalid) {
      return;
    } */
    
    // Préparer les réponses
    const answers = this.form.value.questions.map((question: any) => {
    const selectedOption = question.options.find((option: any) => option.isCorrect);
    console.log(' prep ' + selectedOption)
    return selectedOption ? selectedOption.optionText : null;
  });
    console.log('5')

    //const answers = this.form.value.questions.map((q: any) => q.options.findIndex((o: any) => o));
    console.log('4')
    this.quizService.takeQuiz(this.courseId, { answers })
      .pipe(first())
      .subscribe({
        next: (result: any) => {
          console.log('3')
          this.score = result.percentage;
          this.certificate = result.certificate;
          this.alertService.success('You succed with '+(result.percentage).toFixed(2) +' %' , { keepAfterRouteChange: true });
          this.router.navigate(['/quizzes']);
        },
        error: (error: any) => {
          console.log('2')
          this.alertService.error(error);
        }
      });
      console.log('1')
  }
}
