import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly API_URL = 'http://localhost:8088/SpringMVC/users';
  
  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get(`${this.API_URL}/listuser`)
  }

  getUserByUserName(username: string) {
    return this.httpClient.get(`${this.API_URL}/getUser/${username}`)
  }

  addUser(user : any) {
    return this.httpClient.post(`${this.API_URL}/adduser`, user)
  }

  updateUser(user : any){
    return this.httpClient.put(`${this.API_URL}/updateUser`, user)
  }

  deleteUser(idUser : any){
    return  this.httpClient.delete(`${this.API_URL}/deleteUser/${idUser}`)
  }

  search(firstName: string, lastName: string, idRole: number) {

    return this.httpClient.get(`${this.API_URL}/search?firstName=${firstName}&lastName=${lastName}&idRole=${idRole}`);
  }
}