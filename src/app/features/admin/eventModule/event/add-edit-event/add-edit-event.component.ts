import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

<<<<<<< HEAD
import { AlertService, EventService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParticipantComponent } from '../participant/participant.component';
import { MeetingComponent } from '../meetings';
import { first } from 'rxjs';

@Component({templateUrl: 'add-edit-event.component.html' , styleUrls: ['add-edit-event.component.css']})
export class AddEditEventComponent {

    form!: FormGroup;
=======
import { EventService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParticipantComponent } from '../participant/participant.component';
import { MeetingComponent } from '../meetings';

@Component({templateUrl: 'add-edit-event.component.html' , styleUrls: ['add-edit-event.component.css']})
export class AddEditEventComponent implements OnInit {

    form: FormGroup;
>>>>>>> siwarMerge
  loading = false;
  submitted = false;
  title = 'Create Event';
  buttonLabel = 'Create';
  eventId?: string;
  participantId: string = '';
  meetingLink : string = ''

<<<<<<< HEAD
  // Image_Attribut 
  selectedFile: File | null = null
  previewUrl: string | ArrayBuffer | null | undefined = null

=======
>>>>>>> siwarMerge
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
<<<<<<< HEAD
    private modalService: NgbModal,
    private alertService: AlertService
  ) { }

  ngOnInit() {
=======
    private modalService: NgbModal
  ) {
>>>>>>> siwarMerge
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      duration: [0, Validators.required],
      type: ['', Validators.required],
<<<<<<< HEAD
      meeting : [''],
      image : ['']
    });

=======
      meeting : ['']
    });
  }

  ngOnInit(): void {
>>>>>>> siwarMerge
    this.eventId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.eventId) {
      this.title = 'Edit Event';
      this.buttonLabel = 'Update';
      this.eventService.getById(this.eventId).subscribe((event) => {
        this.form.patchValue(event);
        console.log('meeting link '+ event.meeting)
        if (event.meeting){
          console.log('meeting link '+ event.meeting.meetingLink)
          this.meetingLink = event.meeting.meetingLink
        }
      });
    }
  }

  get f() {
    return this.form.controls;
  }

<<<<<<< HEAD
  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log('target ', event.target.files[0])

    if (this.selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        this.previewUrl = reader.result
      };
      reader.readAsDataURL(this.selectedFile)
=======
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    if (this.eventId) {
      this.eventService.update(this.eventId, this.form.value).subscribe(
        () => {
          this.router.navigate(['admin/event']);
        },
        (error) => {
          this.loading = false;
        }
      );
    } else {
      this.eventService.create(this.form.value).subscribe(
        () => {
          this.router.navigate(['admin/event']);
        },
        (error) => {
          this.loading = false;
        }
      );
>>>>>>> siwarMerge
    }
  }
  openParticipantModal() {
    const modalRef = this.modalService.open(ParticipantComponent);
    modalRef.componentInstance.eventId = this.eventId;
  }

  openMeetingModal() {
    const modalRef = this.modalService.open(MeetingComponent);
    console.log(' add eddit '+ this.eventId)
    modalRef.componentInstance.eventId = this.eventId;
  }
<<<<<<< HEAD
  submitting = false
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

   
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.submitting = true;

    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value)
    formData.append('description', this.form.get('description')?.value)
    formData.append('date', this.form.get('date')?.value)
    formData.append('duration', this.form.get('duration')?.value)
    formData.append('type', this.form.get('type')?.value)
    // add image if selected
    if (this.selectedFile){
        formData.append('image', this.selectedFile)
    }

    
    // create or update course based on id param
    let saveModel;
    let message: string;
    
    if (this.eventId) {
        saveModel = () => this.eventService.update(this.eventId, formData);
        message = 'Event updated';
    } else {
        saveModel = () => this.eventService.create(formData);
        message = 'Event created';
    }


    saveModel()
        .pipe(first())
        .subscribe({
            next: () => {            
                this.alertService.success(message, { keepAfterRouteChange: true });
                this.router.navigateByUrl('admin/event');
            },
            error: (error) => {
                this.alertService.error(error)
                this.submitting = false
            }
        });
}
=======
>>>>>>> siwarMerge
}
