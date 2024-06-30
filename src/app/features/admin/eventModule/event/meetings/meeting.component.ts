import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventService, MeetingService } from '@app/_services';
import { Meeting } from '@app/_models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: 'meeting.component.html' , styleUrls: ['meeting.component.css']})
export class MeetingComponent {
  @Input() eventId!: string;

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eventService : EventService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.formBuilder.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      meetingLink: [''],
    });
  }


  get f() {
    return this.form.controls;
  }

  onSubmit() {
    console.log('hello')
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const meeting: any = {
      event: this.eventId,
      startTime: this.form.value.startTime,
      endTime: this.form.value.endTime,
    };
    console.log('eventId ' + this.eventId)
    this.eventService.createMeeting(this.eventId, meeting).subscribe(
      () => {
        this.activeModal.close();
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
