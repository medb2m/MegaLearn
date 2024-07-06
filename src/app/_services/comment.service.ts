import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/posts/comments`;

  constructor(private http: HttpClient) { }

  getAllComments(postId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${postId}`);
  }

  addComment(postId: string, comment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}`, comment);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${commentId}`);
  }
}


