import { Component } from '@angular/core';
import { EventService } from '@app/_services';
import { first } from 'rxjs';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent {
  events: any;
  isMyEventsRoute: boolean = false;
  constructor(
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.eventService.getByUser().pipe(first()).subscribe(events => {
      this.events = events;
  })
}
}