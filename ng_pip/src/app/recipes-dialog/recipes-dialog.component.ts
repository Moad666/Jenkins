import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/models/recipe';
import { RecipesService } from 'src/services/recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipes-dialog',
  templateUrl: './recipes-dialog.component.html',
  styleUrls: ['./recipes-dialog.component.css']
})
export class RecipesDialogComponent implements OnInit{

  constructor(private recipeService : RecipesService,private router : Router,private route : ActivatedRoute){}
  id : number|undefined;
  recipe : Recipe = new Recipe();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  this.recipeService.getRecipeById(this.id).subscribe(data =>{
    this.recipe = data;
  });
  }

  onSubmit(){
    this.recipeService.updateRecipe(this.id, this.recipe).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Recipe updated Successfully!',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      this.goToRecipePage();
    });
  }

  goToRecipePage(){
    this.router.navigate(['/recipes']);
  }

  Return(){
    this.router.navigate(['/recipesDialog']);
  }

}
