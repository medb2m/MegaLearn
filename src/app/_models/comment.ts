export interface Comment {
    id: number;
    postId: number;
    content: string;
    author: {
      firstName: string;
      lastName: string;
    };
    createdAt: Date;
  }
  