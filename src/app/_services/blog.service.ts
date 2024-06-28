import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Post } from '@app/_models/post';
import { Comment } from '@app/_models/comment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = environment.apiUrl; // Adjust based on your environment setup

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    const url = `${this.apiUrl}/posts`; // Example API endpoint for posts
    return this.http.get<Post[]>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching posts:', error);
        return throwError('Something went wrong fetching posts.');
      })
    );
  }

  getPostById(postId: number): Observable<Post> {
    const url = `${this.apiUrl}/posts/${postId}`; // Example API endpoint for a single post
    return this.http.get<Post>(url).pipe(
      catchError((error: any) => {
        console.error(`Error fetching post ${postId}:`, error);
        return throwError(`Something went wrong fetching post ${postId}.`);
      })
    );
  }

  getCommentsForPost(postId: number): Observable<Comment[]> {
    const url = `${this.apiUrl}/posts/${postId}/comments`; // Example API endpoint for comments of a post
    return this.http.get<Comment[]>(url).pipe(
      catchError((error: any) => {
        console.error(`Error fetching comments for post ${postId}:`, error);
        return throwError(`Something went wrong fetching comments for post ${postId}.`);
      })
    );
  }

  addCommentToPost(postId: number, comment: Comment): Observable<Comment> {
    const url = `${this.apiUrl}/posts/${postId}/comments`; // Example API endpoint to add a comment to a post
    return this.http.post<Comment>(url, comment).pipe(
      catchError((error: any) => {
        console.error(`Error adding comment to post ${postId}:`, error);
        return throwError(`Something went wrong adding comment to post ${postId}.`);
      })
    );
  }

  deletePost(postId: string): Observable<any> {
    const url = `${this.apiUrl}/posts/${postId}`;
    return this.http.delete(url);
  }

  // Add additional methods like updatePost, addPost, etc., as per your API and application requirements
}
