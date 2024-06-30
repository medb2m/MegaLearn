import { Participant } from "./participant";
import { Meeting } from "./meeting";
  export class Event {
    _id!: string;
    title!: string;
    description!: string;
    date!: Date;
    duration!: number;
    type!: 'webinar' | 'class' | 'private';
    host!: string;
    participants!: Participant[];
    meeting!: Meeting;
    image !: string;
  }
  