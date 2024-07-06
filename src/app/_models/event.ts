import { Participant } from "./participant";
import { Meeting } from "./meeting";
  export class Event {
<<<<<<< HEAD
    _id!: string;
=======
    _id?: string;
>>>>>>> siwarMerge
    title!: string;
    description!: string;
    date!: Date;
    duration!: number;
    type!: 'webinar' | 'private';
    host!: string;
<<<<<<< HEAD
    participants!: Participant[];
    meeting!: Meeting;
=======
    participants?: Participant[];
    meeting?: Meeting;
>>>>>>> siwarMerge
    image ?: string;
  }
  