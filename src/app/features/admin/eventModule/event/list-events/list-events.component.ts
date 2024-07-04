import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { EntityService, EventService } from '@app/_services';
import { Entity } from '@app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeetingComponent } from '../meetings';

@Component({
  selector: 'list-entities',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent {
  events: any[] = [];
  searchText: string = '';
  selectedEvents: Event[] = [];

  constructor(
    private eventService: EventService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.eventService.getAll().pipe(first()).subscribe(events => {
      console.log('events')
      console.log(events)
      this.events = events;
    });
  }

  deleteEvent(id: string) {
    console.log('id del ' + id)
    const event = this.events.find(x => x._id === id);
    if (!event) return;
    event.isDeleting = true;
    this.eventService.delete(id).subscribe(() => {
      this.events = this.events.filter(x => x._id !== id);
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

  openMeetingModal(eventId : string) {
    const modalRef = this.modalService.open(MeetingComponent);
    console.log(' add eddit '+ eventId)
    modalRef.componentInstance.eventId = eventId;
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
