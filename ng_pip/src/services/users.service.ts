import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient : HttpClient) { }
  private baseUrl = "http://127.0.0.1:8000/api";

  getUsersList() : Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl}/list_user/`);
  }

  createUser(user : User): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/create_user/`, user);
    }

    deleteUser(id:number | undefined) : Observable<Object>{
      return this.httpClient.delete(`${this.baseUrl}/users/${id}/`);
      }

      updateUser(id:number|undefined, user : User): Observable<Object>{
        return this.httpClient.put(`${this.baseUrl}/usersupdate/${id}/`,user);

        }

        getUserById(id : number |undefined): Observable<User>{
          return this.httpClient.get<User>(`${this.baseUrl}/userbyid/${id}/`)
          }

}
