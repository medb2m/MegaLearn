export class Participant {
    user!: string;
    status!: 'pending' | 'approved';
  }
  
  export class Event {
    _id!: string;
    title!: string;
    description!: string;
    date!: Date;
    duration!: number;
    type!: 'webinar' | 'class' | 'private';
    host!: string;
    participants!: Participant[];
    meetings!: string[];
  }
  