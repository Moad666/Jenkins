import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient : HttpClient) { }
  private baseUrl = "http://127.0.0.1:8000/api";
  private baseUrl2 = "http://127.0.0.1:8001/api";

  countRecipes(): Observable<{ recipe_count: number }> {
    return this.httpClient.get<{ recipe_count: number }>(`${this.baseUrl2}/recipe-count/`);
  }

  countUsers(): Observable<{ user_count: number }> {
    return this.httpClient.get<{ user_count: number }>(`${this.baseUrl2}/user-count/`);
  }

  countRating(): Observable<{ rating_count: number }> {
    return this.httpClient.get<{ rating_count: number }>(`${this.baseUrl2}/rating-count/`);
  }

  countComment(): Observable<{ comment_count: number }> {
    return this.httpClient.get<{ comment_count: number }>(`${this.baseUrl2}/comment-count/`);
  }
}
