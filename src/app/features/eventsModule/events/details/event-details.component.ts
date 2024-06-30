import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router : Router,
    private meetingService: MeetingService
  ) {}

  /* ngOnInit() {
    console.log('hello')
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getById(id).subscribe((data: any) => {
        this.event = data;
        this.meetingService.getAllForEvent(id).subscribe((meetings) => {
          this.meetings = meetings;
        }); 
      });
    }
  } */

    ngOnInit(): void {
      const eventId = this.route.snapshot.paramMap.get('id');
      if (eventId) {
        this.eventService.getById(eventId).subscribe(event => {
          this.event = event;
        });
      }
    }

  join() {
      this.eventService.join(this.event._id).subscribe(
        () => {
          alert('Wait for approval');
        },
        () => {
          alert('Failed to add participant');
        }
      );
  }

  joinMeeting(meetingId: string) {
    this.router.navigate(['/video-chat', meetingId]);
  }
}
