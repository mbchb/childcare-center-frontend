import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8088/SpringMVC/auth';

const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'})
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  
  login(credentiels): Observable<any> {
    const formBody = Object.keys(credentiels).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(credentiels[key])).join('&');
    return this.http.post(AUTH_API + `/login` , formBody, httpOptions);
  }

  signup(user : any) {
    return this.http.post(AUTH_API + `/signup`, user)
  }

}
