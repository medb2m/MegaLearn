import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Quiz } from '@app/_models';
import { AlertService, QuizService } from '@app/_services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-add-edit-quiz',
  templateUrl: './add-edit-quiz.component.html',
  styleUrls : ['./add-edit-quiz.component.css']
})
export class AddEditQuizComponent  implements OnInit{
  /* form!: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    
    
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      questions: this.formBuilder.array([
        this.createQuestionFormGroup()
      ])
    });

    this.title = 'Create Quiz';
    if (this.id) {
      this.title = 'Edit Quiz';
      this.loading = true;
      this.quizService.getById(this.id)
        .pipe(first())
        .subscribe(quiz => {
          this.form.patchValue({
            name: quiz.name
          });
          quiz.questions.forEach(question => this.addQuestion(question));
          this.loading = false;
        });
    }
  }

  createQuestionFormGroup(): FormGroup {
    return this.formBuilder.group({
        question: ['', Validators.required],
        options: this.formBuilder.array([
            this.createOptionFormGroup()
        ]),
        answer: ['', Validators.required]
    });
}

createOptionFormGroup(): FormGroup {
    return this.formBuilder.group({
        option: ['', Validators.required]
    });
}

  get f() { return this.form.controls; }
  get questions() { return this.form.get('questions') as FormArray; }

  addQuestion(question: any = { question: '', options: [''], answer: '' }) {
    const options = this.formBuilder.array(
      question.options.map((opt: string) => this.formBuilder.control(opt, Validators.required))
    );
    const questionGroup = this.formBuilder.group({
      question: [question.question, Validators.required],
      options: options,
      answer: [question.answer, Validators.required]
    });
    this.questions.push(questionGroup);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  addOption(questionIndex: number) {
    const options = this.questions.at(questionIndex).get('options') as FormArray;
    options.push(this.formBuilder.control('', Validators.required));
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const options = this.questions.at(questionIndex).get('options') as FormArray;
    options.removeAt(optionIndex);
  }

   */

    form!: FormGroup;

    id!: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  courseId : any
  creatorName : any
  courseName : any
  

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.route.queryParamMap.subscribe(params => {
        this.courseId = params.get('courseId')
      });
    

    if (this.id) {
        // edit mode
      this.title = 'Edit Quiz';
      this.loading = true;
      this.form = this.fb.group({
        title: ['', Validators.required],
        course: [''],
        creator: [''],
        questions: this.fb.array([])
      });
      this.quizService.getById(this.id)
        .pipe(first())
        .subscribe(quiz => {
          this.form.patchValue({
            title: quiz.title,
            course: quiz.course,
            creator: quiz.creator,
          });
          this.creatorName = this.form.get('creator')?.value
          this.courseName = this.form.get('course')?.value
          quiz.questions.forEach((question: any) => {
            const questionForm = this.fb.group({
              questionText: [question.questionText, Validators.required],
              options: this.fb.array([])
            });
            question.options.forEach((option: any) => {
              const optionForm = this.fb.group({
                optionText: [option.optionText, Validators.required],
                isCorrect: [option.isCorrect, Validators.required]
              });
              (questionForm.get('options') as FormArray).push(optionForm);
            });
            this.questions.push(questionForm);
          });
          this.loading = false;
        });
    } else {
        this.title = 'Create Quiz';
        this.form = this.fb.group({
        title: ['', Validators.required],
        questions: this.fb.array([])
      });

    }
}


get f() { return this.form.controls; }
  get questions() {
    return this.form.get('questions') as FormArray;
  }
  getOptions(questionIndex: number) {
    const question = this.questions.at(questionIndex);
    const options = question.get('options') as FormArray;
    return options.controls;
  }



  addQuestion() {
    const questionForm = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array([])
    });
    this.questions.push(questionForm);
  }

  addOption(questionIndex: number) {
    const options = this.questions.at(questionIndex).get('options') as FormArray;
    const optionForm = this.fb.group({
      optionText: ['', Validators.required],
      isCorrect: [false, Validators.required]
    });
    options.push(optionForm);
  }

  openAccordionIndex: number | null = null;

  toggleAccordion(index: number) {
    this.openAccordionIndex = this.openAccordionIndex === index ? null : index;
  }

  isOpen(index: number) {
    return this.openAccordionIndex === index;
  }

  onSubmit() {
    console.log('Form:', this.form.value);
    this.submitted = true;
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log('Form is valid');
    this.submitting = true;
    const quizData = this.form.value;
    const saveQuiz = this.id
      ? this.quizService.update(this.id, quizData)
      : this.quizService.create(this.courseId, quizData);
      console.log('1')
    saveQuiz.pipe(first()).subscribe({
      next: () => {
        console.log('Quiz saved successfully');
        this.router.navigate([`admin/quiz/`])
      },
      error: error => {
        console.error('Error saving quiz:', error);
        // Gérez les erreurs ici, par exemple en affichant un message d'erreur à l'utilisateur
      }
    });


  /**** */
  /* onSubmit() {
    console.log('8')
    this.submitted = true;
    this.alertService.clear();
    console.log('7')
    if (this.form.invalid) {
        console.log('Form is invalid');
      return;
    }
    console.log('6')
    this.submitting = true;
    const quizData = this.form.value;
    console.log('5')
    const saveQuiz = this.id
      ? this.quizService.update(this.id, quizData)
      : this.quizService.create(quizData);
      console.log('4')
    saveQuiz.pipe(first()).subscribe({
      next: () => {
        console.log('3')
        this.alertService.success(this.id ? 'Quiz updated' : 'Quiz created', { keepAfterRouteChange: true });
        this.router.navigateByUrl('/admin/quiz');
      },
      error: error => {
        console.log('2')
        this.alertService.error(error);
        this.submitting = false;
      }
    });
    console.log('1')
  }
 */}}

