import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private localStorageKey = 'isAuthenticated';

  private baseUrl = "http://127.0.0.1:8000/accounts/register/";

  constructor(private httpClient : HttpClient) { }

  createUser(user : User) : Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`,user);
  }
  /*createUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, user).pipe(
      // Assuming your API returns a token upon successful registration
      tap(() => this.setAuthentication(true))
    );
  }
  private setAuthentication(isAuthenticated: boolean): void {
    localStorage.setItem(this.localStorageKey, isAuthenticated.toString());
  }*/
}
