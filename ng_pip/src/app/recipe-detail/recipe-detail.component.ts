import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commentaire } from 'src/models/commentaire';
import { Rating } from 'src/models/rating';
import { Recipe } from 'src/models/recipe';
import { User } from 'src/models/user';
import { LoginService } from 'src/services/login.service';
import { RecipesService } from 'src/services/recipes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  recipeId !: any;
  recipe : Recipe = new Recipe();
  selectedRecipe: any;
  comment : Commentaire = new Commentaire();
  userId : any;
  user : User = new User();
  rating : Rating = new Rating();

  constructor(private route: ActivatedRoute, private recipeService : RecipesService,
    private loginService : LoginService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.recipeId = params.get('id') || '';
      if (this.recipeId) {

        this.recipeService.getRecipeById(this.recipeId).subscribe(
          (recipe: any) => {
            this.selectedRecipe = recipe;
            this.loadComments();
          },
          (error) => {
            console.error('Error fetching recipe details:', error);
          }
        );
      }
    });
    this.loginService.getAuthenticatedUser().subscribe(
      (user) => {
        if (user) {
          this.userId = user.id;
        }
      }
    );
  }

  comments: Commentaire[] = [];
  loadComments() {
    this.recipeService.getCommentsForRecipe(this.recipeId).subscribe(
      (comments: Commentaire[]) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  createComment(): void {
    // Ensure you have the necessary information
    if (this.userId && this.recipeId) {
      // Set the user ID and recipe ID for the comment
      this.comment.user = this.userId;
      this.comment.recipe = this.recipeId;
      this.comment.text = this.comment.text || '';

      // Call the service to create the comment
      this.recipeService.createComment(this.comment).subscribe(
        (response: any) => {
          console.log('Comment created successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Comment add Successfully!',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          }).then((result)=>{
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
          // Optionally, you can update the UI or perform any additional actions
        },
        (error: any) => {
          console.error('Error creating comment', error);
          Swal.fire({
            icon: 'error',
            title: 'Please add comment first',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          }).then((result)=>{
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
          // Handle error, show a message, etc.
        }
      );
    } else {
      console.warn('Invalid user ID or recipe ID');
      Swal.fire({
        icon: 'error',
        title: 'You should be authenticated',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      // Handle the case where user ID or recipe ID is missing
    }
  }
  rateRecipe(ratingValue: number) {
    this.rating.rate = ratingValue;
    this.rating.user = this.userId;
    this.rating.recipe = this.recipeId;
    // Call the service method to create the rating
    this.recipeService.createRating(this.rating).subscribe(
      (response) => {
        // Handle success if needed
        Swal.fire({
          icon: 'success',
          title: 'Rate add Successfully!',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then((result)=>{
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      },
      (error) => {
        // Handle error
        console.error('Error submitting rating', error);
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then((result)=>{
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

        // Check the error response from the server
        if (error.status === 400) {
          console.error('Bad Request:', error.error);
          Swal.fire({
            icon: 'error',
            title: 'You should be authenticated',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          }).then((result)=>{
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      }
    );

  }

}
