import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event, Meeting, Participant } from '@app/_models';
import { AccountService, AlertService, EventService } from '@app/_services';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventdetailsComponent implements OnInit {
  event!: Event;
  //meetings: Meeting[] = [];

  approvedParticipantsCount: number = 0;

  userStatus : string = 'notJoined'

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router : Router,
    private alertService : AlertService,
    private accountService : AccountService
  ) {}

    ngOnInit(): void {
      const eventId = this.route.snapshot.paramMap.get('id');
      if (eventId) {
        this.eventService.getById(eventId).subscribe(event => {
          this.event = event;
          this.checkUserStatus()
          this.updateApprovedParticipantsCount()
        });
      }
    }

    

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
        }
      );
  }

  joinMeeting(meetingId: string) {
    this.router.navigate(['/event/meeting', meetingId]);
  }
}
