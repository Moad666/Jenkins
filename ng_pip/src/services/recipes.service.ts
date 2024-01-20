import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Commentaire } from 'src/models/commentaire';
import { Rating } from 'src/models/rating';
import { Recipe } from 'src/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private httpClient : HttpClient, private router : Router) { }
  private baseUrl = "http://127.0.0.1:8000/api";

  getResipesList() : Observable<Recipe[]>{
    return this.httpClient.get<Recipe[]>(`${this.baseUrl}/list_recipe/`);
  }

  createRecipe(recipe : Recipe): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/create_recipe/`, recipe);
    }

    deleteRecipe(id:number | undefined) : Observable<Object>{
      return this.httpClient.delete(`${this.baseUrl}/recipes/${id}/`);
      }


      updateRecipe(id:number|undefined, recipe : Recipe): Observable<Object>{
        return this.httpClient.put(`${this.baseUrl}/recipesupdate/${id}/`,recipe);

        }

        getRecipeById(id : number |undefined): Observable<Recipe>{
          return this.httpClient.get<Recipe>(`${this.baseUrl}/recipesbyid/${id}/`)
          }

          getCommentsForRecipe(recipeId: number): Observable<Commentaire[]> {
            return this.httpClient.get<Commentaire[]>(`${this.baseUrl}/recipe_comments/${recipeId}/`);
          }

          createComment(comment: Commentaire): Observable<Object> {
            const headers = {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            };
            return this.httpClient.post(`${this.baseUrl}/create_comment/`, comment, { headers });
          }

          createRating(rating: Rating): Observable<Object> {
            const headers = {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            };
            return this.httpClient.post(`${this.baseUrl}/create_rate/`, rating, { headers });
          }

          getCommentCountForRecipe(recipeId: number): Observable<number> {
            const url = `${this.baseUrl}/recipescommentcount/${recipeId}/`;
            return this.httpClient.get<any>(url).pipe(
              map((response) => response.comment_count)
            );
          }

          getRatingCountForRecipe(recipeId: number): Observable<number> {
            const url = `${this.baseUrl}/recipesratingcount/${recipeId}/`;
            return this.httpClient.get<any>(url).pipe(
              map((response) => response.reting_count)
            );
          }
}
