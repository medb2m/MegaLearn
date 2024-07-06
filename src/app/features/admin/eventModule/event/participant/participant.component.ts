import { Component, Input } from '@angular/core';
import { Event, Participant } from '@app/_models';
import { EventService } from '@app/_services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent {
  @Input() eventId!: string;
  
  allParticipants: any[] = [];
  pendingParticipants: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadEventParticipants();
  }

   // Fetch participants from the event
   loadEventParticipants() {
    this.eventService.getById(this.eventId).pipe(first()).subscribe(
      (event: Event) => {
        console.log('all '+ this.eventId )
        if (event.participants){
          this.allParticipants = event.participants;
          this.pendingParticipants = event.participants.filter(participant => participant.status === 'pending');
        }
      },
      error => {
        console.error('Error fetching event participants:', error);
      }
    );
  }

  approveParticipant(participantId: string) {
    if (this.eventId && participantId) {
      this.eventService.approveParticipant(this.eventId, participantId).subscribe(
        () => {
          alert('Participant approved successfully');
          this.loadEventParticipants();
        },
        () => {
          alert('Failed to approve participant');
        }
      );
    }
  }

  disapproveParticipant(participantId: string) {
    if (this.eventId && participantId) {
      this.eventService.disapproveParticipant(this.eventId, participantId).subscribe(
        () => {
          alert('Participant disapproved successfully');
          this.loadEventParticipants();
        },
        () => {
          alert('Failed to disapprove participant');
        }
      );
    }
  }
}
