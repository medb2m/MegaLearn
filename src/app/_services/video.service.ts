import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '@app/_models/video';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class VideosService {
    private baseUrl = `${environment.apiUrl}/videos`;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Video[]>(this.baseUrl);
    }

    getById(id: string): Observable<Video> {
        return this.http.get<Video>(`${this.baseUrl}/get/${id}`);
    }

    uploadVideo(formData : FormData): Observable<any> {
        return this.http.post(`${this.baseUrl}/upload`, formData);
    }
}
