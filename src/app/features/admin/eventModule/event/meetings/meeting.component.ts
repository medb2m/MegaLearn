import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventService, MeetingService } from '@app/_services';
import { Meeting } from '@app/_models';

@Component({templateUrl: 'meeting.component.html' , styleUrls: ['meeting.component.css']})
export class MeetingComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  eventId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService,
    private eventService : EventService
  ) {
    this.form = this.formBuilder.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      meetingLink: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId') || '';
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
    const meeting: any = {
      event: this.eventId,
      startTime: this.form.value.startTime,
      endTime: this.form.value.endTime,
      meetingLink: this.form.value.meetingLink,
    };

    this.eventService.createMeeting(this.eventId, meeting).subscribe(
      () => {
        this.router.navigate(['/events', this.eventId]);
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
