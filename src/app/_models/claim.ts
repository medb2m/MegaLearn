export class Claim {
    _id!: string;
    title?: string;
    description?: string;
    status?: 'Open' | 'In Progress' | 'Closed';
    author?: string;
    chat?: [];
    createdAt !: Date;
}