import { Role } from './role';

export class Account {
    id: string = "";
    title?: string;
<<<<<<< HEAD
    username!: string;
=======
    username?: string;
>>>>>>> siwarMerge
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
    jwtToken?: string;
    profilePictureUrl?:string; // tobe cancelled
    image?:string
}