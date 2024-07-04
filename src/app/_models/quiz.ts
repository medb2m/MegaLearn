import { Course } from './course';
import { Question } from './question';

export class Quiz {
  _id!: string;
  title!: string;
  course!: Course; // Course ID
  questions!: Question[]; // model Question
  creator!: any; // User ID
}
