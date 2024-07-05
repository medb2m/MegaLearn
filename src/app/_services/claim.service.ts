import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Chat } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = `${environment.apiUrl}/claim`;

  constructor(private http: HttpClient) { }

  addMessage(msg : FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/msg`, msg);
  }

  getMessages(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/msg`);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, post);
  }

  updatePost(id: string, post: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, post);
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