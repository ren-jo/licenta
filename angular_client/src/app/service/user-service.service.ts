import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL:string="http://localhost:8080/backend/user";
  loginURL:string="http://localhost:8080/backend/login";
  logoutURL:string="http://localhost:8080/backend/logout";
  registerURL:string="http://localhost:8080/backend/register";

  constructor(private http:HttpClient) {
  }

  getAllUsers(){
    return this.http.get<User[]>(this.userURL);
  }

  authenticateUser(user:User){
    return this.http.post<any>(this.loginURL,user);
  }

  logoutUser(username:string){
    return this.http.post<any>(this.logoutURL,username);
  }

  persistUser(user:User){
    return this.http.put(this.registerURL,user);
  }
}
