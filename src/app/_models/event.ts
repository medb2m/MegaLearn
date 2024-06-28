import { Participant } from "./participant";
  export class Event {
    _id!: string;
    title!: string;
    description!: string;
    date!: Date;
    duration!: number;
    type!: 'webinar' | 'class' | 'private';
    host!: string;
    participants!: Participant[];
    meetings!: string;
    image !: string;
  }
  