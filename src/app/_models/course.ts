import { Category } from "./category";

export class Course {
    _id?: string;
    title?: string;
    description : string = "";
    price : number = 0;
    duration : number = 0;
    category! : Category;
    creator ?: any;
    creatorName ?: string;
    sections?: string[];
    image?: string;
  }