import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
<<<<<<< HEAD
import { Event, Meeting, Participant } from '@app/_models';
import { AccountService, AlertService, EventService } from '@app/_services';
=======
import { Meeting } from '@app/_models';
import { EventService, MeetingService } from '@app/_services';
>>>>>>> siwarMerge

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventdetailsComponent implements OnInit {
<<<<<<< HEAD
  event!: Event;
  //meetings: Meeting[] = [];

  approvedParticipantsCount: number = 0;

  userStatus : string = 'notJoined'
=======
  event!: any;
  meetings: Meeting[] = [];
>>>>>>> siwarMerge

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router : Router,
<<<<<<< HEAD
    private alertService : AlertService,
    private accountService : AccountService
  ) {}

=======
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

>>>>>>> siwarMerge
    ngOnInit(): void {
      const eventId = this.route.snapshot.paramMap.get('id');
      if (eventId) {
        this.eventService.getById(eventId).subscribe(event => {
          this.event = event;
<<<<<<< HEAD
          this.checkUserStatus()
          this.updateApprovedParticipantsCount()
=======
>>>>>>> siwarMerge
        });
      }
    }

<<<<<<< HEAD
    

    checkUserStatus(): void {
      const currentUserId = this.accountService.accountValue?.id;
      console.log('helllo ' + currentUserId)
      const participant = this.event.participants.find(
        (participant: Participant) => participant.user === currentUserId
      );
  
      if (participant) {
        this.userStatus = participant.status === 'approved' ? 'approved' : 'waitingApproval';
      } else {
        this.userStatus = 'notJoined';
      }
    }

    updateApprovedParticipantsCount(): void {
      if (this.event && this.event.participants) {
        this.approvedParticipantsCount = this.event.participants.filter(
          (participant: Participant) => participant.status === 'approved'
        ).length;
      }
    }

  join( event : string) {
      this.eventService.join(event).subscribe(
        () => {
          this.alertService.success('Wait for approval')
        },
        () => {
          this.alertService.error('Failed to add participant');
=======
  join() {
      this.eventService.join(this.event._id).subscribe(
        () => {
          alert('Wait for approval');
        },
        () => {
          alert('Failed to add participant');
>>>>>>> siwarMerge
        }
      );
  }

  joinMeeting(meetingId: string) {
<<<<<<< HEAD
    this.router.navigate(['/event/meeting', meetingId]);
=======
    this.router.navigate(['/video-chat', meetingId]);
>>>>>>> siwarMerge
  }
}
