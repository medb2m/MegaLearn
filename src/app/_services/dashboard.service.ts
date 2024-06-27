import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from '@app/_models';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    private baseUrl = `${environment.apiUrl}/dashboard`;

    constructor(private http: HttpClient) { }

    getDashboardData(){
        return this.http.get(this.baseUrl);
    }
}