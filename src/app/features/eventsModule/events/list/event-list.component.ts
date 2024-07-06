import { Component, OnInit } from '@angular/core';
import { EventService } from '@app/_services';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: any;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getAll().subscribe((events) => {
      this.events = events;
    });
  }
}
