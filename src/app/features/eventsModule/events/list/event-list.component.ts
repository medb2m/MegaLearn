import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '@app/_services';
import { first } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: any;
  isMyEventsRoute: boolean = false;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /* this.eventService.getAll().pipe(first()).subscribe((events) => {
      this.events = events;
    }); */
    this.route.url.subscribe(urlSegments => {
      this.isMyEventsRoute = urlSegments.some(segment => segment.path === 'myevents');
      this.loadEvents();
    });
  }
  loadEvents() {
    if (this.isMyEventsRoute) {
      this.eventService.getByUser().pipe(first()).subscribe(events => {
        this.events = events;
      });
    } else {
      this.eventService.getAll().pipe(first()).subscribe(events => {
        this.events = events;
      });
    }
  }
}
