import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from '@app/_models';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class EntityService {
    private baseUrl = `${environment.apiUrl}/entity`;

    constructor(private http: HttpClient) { }

    create(entity: FormData): Observable<any> {
        return this.http.post(this.baseUrl, entity);
    }

    getAll(){
        return this.http.get<Entity[]>(this.baseUrl);
    }

    getById(entityId: string): Observable<Entity> {
        return this.http.get<Entity>(`${this.baseUrl}/${entityId}`);
    }

    update(entityId: string, entity: FormData): Observable<Entity> {
        return this.http.put<Entity>(`${this.baseUrl}/${entityId}`, entity);
    }

    delete(entityId: string) {
        return this.http.delete(`${this.baseUrl}/${entityId}`);
    }
}