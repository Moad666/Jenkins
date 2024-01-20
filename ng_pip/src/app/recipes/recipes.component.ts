import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Recipe } from 'src/models/recipe';
import { RecipesService } from 'src/services/recipes.service';
import Swal from 'sweetalert2';
import { RecipesDialogComponent } from '../recipes-dialog/recipes-dialog.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

  constructor(private recipeService : RecipesService,private router : Router,public dialog: MatDialog){}
  recipes : Recipe[] | undefined;
  recipe : Recipe = new Recipe();


  updateRecipe(id : number | undefined){
    this.router.navigate(['recipesDialog', id]);
      }

  private getRecipes(){
    this.recipeService.getResipesList().subscribe(data => {
    this.recipes = data;
    });
  }
  ngOnInit(): void {
    this.getRecipes();
  }

  ngSubmit(){
    this.createRecipe();
  }
  createRecipe(){
    this.recipeService.createRecipe(this.recipe).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Recipe Created Successfully!',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      },
      (error) => {
        console.error('Error creating recipe:', error);

        let errorMessage = 'Enter all data.';
        if (error && error.error && error.error.detail) {
          errorMessage = error.error.detail;
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          showConfirmButton: true,
          confirmButtonText: 'OK'
        });
      }
    );
      }

      deleteRecipe(id : number|undefined){
        this.recipeService.deleteRecipe(id).subscribe(data =>{
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Recipe deleted Successfully!',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        });
      }

      updateRecipes(id : number | undefined){
        this.router.navigate(['recipesDialog', id]);
          }

}
