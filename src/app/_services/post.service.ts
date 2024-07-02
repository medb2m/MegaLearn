import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Comment } from '@app/_models/comment';
import { Post } from '@app/_models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/blog/posts`;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, post);
  }

  updatePost(id: string, post: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createComment(postId: string, comment : any) {
    return this.http.post(`${this.apiUrl}/comments/${postId}`, comment);
  }

  getAllComments(postId : string): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/${postId}`);
  }
}



/* router.get('/comments/:id', getCommentById);
router.put('/comments/:id', authorize(), updateCommentById);
router.delete('/comments/:id', authorize(), deleteCommentById); */