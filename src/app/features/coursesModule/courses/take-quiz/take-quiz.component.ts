import { Component, OnInit, ViewChild } from '@angular/core';
import { CoursesService } from '@app/_services/courses.service';
import { Course } from '@app/_models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, QuizService } from '@app/_services';
import { first } from 'rxjs';
import { Question } from '@app/_models';
import { Option } from '@app/_models/option';
import { CertificatesService } from '@app/_services/certificates.service';
import { WizardComponent } from 'angular-archwizard';

@Component({
    selector: 'app-my-courses',
    templateUrl: './take-quiz.component.html',
    styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {

  @ViewChild(WizardComponent)
  public wizard!: WizardComponent;

  form!: FormGroup;
  courseId!: string;
  quizTitle!: string;
  loading = false;
  submitted = false;
  score?: number;
  certificate?: any;
  quiz : any
  answers: any = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private alertService: AlertService,
    private certificatesService: CertificatesService
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

    if (question && question?.options) {
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
        console.log(this.questions?.controls[0]?.get('selectedOption')?.errors);
        this.loading = false;
      });
  }

  prepareAnswers() {
    // Préparer les réponses
    //const answers = this.form.value.questions.map((q: any) => q.options.findIndex((o: any) => o));
    this.answers = this.form.value.questions?.map((question: any) => {
      const selectedOption = question?.options?.find((option: any) => option?.isCorrect);
      return selectedOption ? selectedOption?.optionText : null;
      });
  }

  prepareAnswer(index: number) {
    this.answers?.push(this.form.value.questions[index]?.options?.find((option: any) => option?.isCorrect));
  }

  onSubmit() {
    this.submitted = true;
    //console.log(this.form)
    
    if (this.answers?.find ((x: any) => !x)) {
      alert("Please answer all quiz questions !");
      return;
    }
    
   
    this.quizService.takeQuiz(this.courseId, this.answers)
      .pipe(first())
      .subscribe({
        next: (result: any) => {
          this.score = result.percentage;
          this.certificate = result.certificate;
          this.alertService.success('You succed with '+(result.percentage)?.toFixed(2) +' %' , { keepAfterRouteChange: true });
          // simulate a 1second delay for better user experience (enough time to read the success message)
          setTimeout(()=>{
            this.downloadCertificate(this.certificate?.certificateId);
            this.router.navigate(['/quizzes']);
          }, 1000);  
        },
        error: (error: any) => {
          this.alertService.error(error);
        }
      });
  }

  downloadCertificate(certificateId: string) {
  this.certificatesService.downloadCertificate(certificateId)
      .subscribe(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        this.certificatesService.getCertificatesById(certificateId).subscribe(certificate => {
          const newWindow = window.open(fileURL);
          if (newWindow) {
            newWindow.onload = () => {
              newWindow.document.title = certificate.certificateLink;
            };
          } else {
            console.error('Failed to open new window');
          }
        });
      }, error => {
        console.error('Error downloading certificate', error);
      });
    }


    getStepSymbol(i: any) {
      return {symbol : i+1};
    }

    getStepTitle(i: any) {
      return 'Question ' + (i+1);
    }

    goTo(index: number) {
        if (index >= 0 && index < this.questions?.controls?.length) {
          this.wizard.goToStep(index);
        }
    }
       
    isAnswered(index: number) {
      return this.answers ? this.answers[index] ? 'Answered' : 'Not Answered' : 'Not Answered';
    }

}
