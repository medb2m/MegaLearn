import { Account } from "./account";
import { Course } from "./course";
import { Quiz } from "./quiz";

export class Certificate {
    _id!: string;
    user!: Account;
    course!: Course;
    quiz!: Quiz;
    date!: Date;
    score!: Number;
    certificateId!: string;
    certificateLink!: string;
  }
