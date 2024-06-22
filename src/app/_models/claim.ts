export class Claim {
    _id!: string;
    title?: string;
    description?: string;
    status?: 'Open' | 'In Progress' | 'Closed';
    author?: string;  // Assuming author and assignedTo are stored as string IDs
    assignedTo?: string;
}