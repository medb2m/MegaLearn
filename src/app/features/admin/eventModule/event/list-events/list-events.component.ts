import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { EntityService, EventService } from '@app/_services';
import { Entity } from '@app/_models';

@Component({
  selector: 'list-entities',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent {
  events: any[] = [];
  searchText: string = '';
  selectedEvents: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAll().pipe(first()).subscribe(events => {
      this.events = events;
    });
  }

  deleteEvent(id: string) {
    const event = this.events.find(x => x.id === id);
    if (!event) return;
    event.isDeleting = true;
    this.eventService.delete(id).subscribe(() => {
      this.events = this.events.filter(x => x.id !== id);
    });
  }

  toggleAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.events.forEach(event => event.selected = isChecked);
    this.updateSelection();
  }

  updateSelection() {
    this.selectedEvents = this.events.filter(event => event.selected);
  }

  /* deleteSelectedEvents(): void {
    this.selectedEvents.forEach(event => {
      this.eventService.delete(event._id).subscribe(() => {
        this.events = this.events.filter(x => x.id !== event.id);
        this.updateSelection();
      });
    });
  } */
}
