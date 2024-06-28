import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from '@app/_models';
import { EventService, MeetingService } from '@app/_services';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventdetailsComponent implements OnInit {
  event!: any;
  meetings: Meeting[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private meetingService: MeetingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getById(id).subscribe((data: any) => {
        this.event = data;
        this.meetingService.getAllForEvent(id).subscribe((meetings) => {
          this.meetings = meetings;
        });
      });
    }
  }
}
