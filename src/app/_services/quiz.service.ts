import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Quiz } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = `${environment.apiUrl}/quiz`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl);
  }

  getById(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }

  getByCourseId(courseId: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/course/${courseId}`);
  }

  create(id: string , quiz: FormData): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.apiUrl}/${id}`, quiz);
  }

  update(id: string, quiz: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, quiz);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  takeQuiz(id: string, answers: any) {
    return this.http.post(`${this.apiUrl}/take/${id}`, answers);
  }
}
