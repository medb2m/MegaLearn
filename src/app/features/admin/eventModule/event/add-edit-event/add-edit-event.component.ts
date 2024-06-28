import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventService } from '@app/_services';

@Component({templateUrl: 'add-edit-event.component.html' , styleUrls: ['add-edit-event.component.css']})
export class AddEditEventComponent implements OnInit {

    form: FormGroup;
  loading = false;
  submitted = false;
  title = 'Create Event';
  buttonLabel = 'Create';
  eventId?: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      duration: [0, Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.eventId) {
      this.title = 'Edit Event';
      this.buttonLabel = 'Update';
      this.eventService.getById(this.eventId).subscribe((event) => {
        this.form.patchValue(event);
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
}
