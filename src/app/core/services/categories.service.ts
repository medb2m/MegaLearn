import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Category } from '@app/_models/category';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  create(category : Category): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, category);
  }

  update(catId: string, category : Category): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${catId}`, category);
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/getall`);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/get/${id}`);
  }

  delete(catId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${catId}`);
  }
  
  associate(catId: string, courseId : string ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${catId}/addcourse/${courseId}`,{});
  }

  //:categoryId/deletecourse/:courseId
  disassociate(catId: string, courseId : string ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${catId}/deletecourse/${courseId}`,{});
  }
}
