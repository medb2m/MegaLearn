import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3030/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  forgetPassword(email: string,): Observable<any> {
    return this.http.post(AUTH_API + 'forget_password', {
      email,
    }, httpOptions);
  }
  login(email: string, motDePass: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      motDePass
    }, httpOptions);
  }

  register(name: string,prenom:string, age:number,email: string,rol:string, motDePass: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      name,
      prenom,
      rol,
      age,
      motDePass,
      email,
    }, httpOptions);
  }
}