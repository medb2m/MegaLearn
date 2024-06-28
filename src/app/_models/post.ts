export interface Post {
    id: number; // Add id property
    title: string;
    content: string;
    author: {
      firstName: string;
      lastName: string;
    };
    image: string;
    createdAt: Date;
  }
  