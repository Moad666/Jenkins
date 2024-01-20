import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient : HttpClient) { }
  private baseUrl = "http://127.0.0.1:8000/api/change_password/";
  private baseUrl2 = "http://127.0.0.1:8000/api/";

  changePassword(oldPassword: string, newPassword: string, headers: HttpHeaders): Observable<any> {
    const payload = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    return this.httpClient.post<any>(this.baseUrl, payload, { headers });
  }
  refreshAccessToken(refreshToken: string): Observable<any> {
    const url = `${this.baseUrl2}token/refresh/`; // Replace with your actual refresh token endpoint
    const payload = {
      refresh: refreshToken,
    };
    return this.httpClient.post<any>(url, payload).pipe(
      catchError((error) => {
        console.error('Error refreshing access token:', error);
        return throwError(error);
      })
    );
  }
}
