import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  constructor(private httpClient: HttpClient) { }
    readonly API_URL = 'http://localhost:8088/SpringMVC/roles';

  getAllRoles() {
    return this.httpClient.get(`${this.API_URL}`);
  }
}
