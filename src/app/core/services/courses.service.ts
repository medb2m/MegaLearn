import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '@app/_models/course';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CoursesService {
    private baseUrl = `${environment.apiUrl}/courses`;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Course[]>(this.baseUrl);
    }

    getById(id: string): Observable<Course> {
        return this.http.get<Course>(`${this.baseUrl}/get/${id}`);
    }

    create(course: FormData): Observable<any> {
        return this.http.post(`${this.baseUrl}/add`, course);
    }

    update(courseId: string, course: FormData): Observable<any> {
        return this.http.put(`${this.baseUrl}/update/${courseId}`, course);
    }

    delete(courseId: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete/${courseId}`);
    }

    enroll(courseId: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/${courseId}/enroll`, {});
    }

    getVideos(courseId: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${courseId}/videos`);
    }

    getEnrolledCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.baseUrl}/enrolled-courses`);
    }

    enrollInCourse(courseId: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/enroll/${courseId}`, {});
    }
    isEnrolled(courseId : string) : Observable<any> {
        return this.http.get(`${this.baseUrl}/isenrolled/${courseId}`)
    }
    searchCourses(query: string): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.baseUrl}/search`, { params: { q: query } });
    }
}