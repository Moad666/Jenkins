import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { Recipe } from 'src/models/recipe';
import { HomeService } from 'src/services/home.service';
import { RecipesService } from 'src/services/recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  constructor(private route: ActivatedRoute, private recipeService : RecipesService,private router : Router, private homeService : HomeService){}
  recipes : Recipe[] | undefined;
  recipe : Recipe = new Recipe();
  showDetailsButton: boolean = false;
  commentCount: number | undefined;
  ratingCount : number | undefined;


  private getRecipes(){
    this.recipeService.getResipesList().subscribe(data => {
    this.recipes = data;
    });
  }

  ngOnInit(): void {
    this.getRecipes();
    //this.getRecipe();
    //this.getRating();
    this.getRecipesCount();
  }

  searchTerm: string = '';
  recipe_search: any[] = [];
  searchRecipes() {
    this.homeService.searchRecipes(this.searchTerm).subscribe(
      (data) => {
        this.recipes = data;

        // Now, for all searched recipes, get comment and rating counts in parallel
        const requests = this.recipes.map((recipe) => {
          const commentCount$ = this.recipeService.getCommentCountForRecipe(recipe.id);
          const ratingCount$ = this.recipeService.getRatingCountForRecipe(recipe.id);

          return forkJoin([commentCount$, ratingCount$]).pipe(
            map(([commentCount, ratingCount]) => {
              recipe.commentCount = commentCount;
              recipe.ratingCount = ratingCount;
              return recipe; // Return the updated recipe
            })
          );
        });

        forkJoin(requests).subscribe((updatedRecipes) => {
          // All searched recipes have been updated with comment and rating counts
          this.recipes = updatedRecipes;
        });
      },
      (error) => {
        console.error('Error fetching recipes:', error);
        Swal.fire({
          icon: 'error',
          title: 'Recipe Not Found',
          text: 'The requested recipe does not exist.',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    );
  }
  private getRecipe() {
    this.recipeService.getResipesList().subscribe((data) => {
      this.recipes = data;

      // Now, for each recipe, get the comment count
      this.recipes.forEach((recipe) => {
        this.recipeService.getCommentCountForRecipe(recipe.id).subscribe(
          (commentCount) => {
            recipe.commentCount = commentCount;
          },
          (error) => {
            console.error('Error fetching comment count:', error);
          }
        );
      });
    });
  }

  private getRating() {
    this.recipeService.getResipesList().subscribe((data) => {
      this.recipes = data;

      // Now, for each recipe, get the comment count
      this.recipes.forEach((recipe) => {
        this.recipeService.getRatingCountForRecipe(recipe.id).subscribe(
          (ratingCount) => {
            recipe.ratingCount = ratingCount;
          },
          (error) => {
            console.error('Error fetching rating count:', error);
          }
        );
      });
    });
  }

  private getRecipesCount() {
    this.recipeService.getResipesList().subscribe((data) => {
      this.recipes = data;

      // Now, for all recipes, get comment and rating counts in parallel
      const requests = this.recipes.map((recipe) => {
        const commentCount$ = this.recipeService.getCommentCountForRecipe(recipe.id);
        const ratingCount$ = this.recipeService.getRatingCountForRecipe(recipe.id);

        return forkJoin([commentCount$, ratingCount$]).pipe(
          map(([commentCount, ratingCount]) => {
            recipe.commentCount = commentCount;
            recipe.ratingCount = ratingCount;
            return recipe; // Return the updated recipe
          })
        );
      });

      forkJoin(requests).subscribe((updatedRecipes) => {
        // All recipes have been updated with comment and rating counts
        this.recipes = updatedRecipes;
      });
    });
  }
}
