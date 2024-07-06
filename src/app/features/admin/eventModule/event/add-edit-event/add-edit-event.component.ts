import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParticipantComponent } from '../participant/participant.component';
import { MeetingComponent } from '../meetings';

@Component({templateUrl: 'add-edit-event.component.html' , styleUrls: ['add-edit-event.component.css']})
export class AddEditEventComponent implements OnInit {

    form: FormGroup;
  loading = false;
  submitted = false;
  title = 'Create Event';
  buttonLabel = 'Create';
  eventId?: string;
  participantId: string = '';
  meetingLink : string = ''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      duration: [0, Validators.required],
      type: ['', Validators.required],
      meeting : ['']
    });
  }

  ngOnInit(): void {
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
}
