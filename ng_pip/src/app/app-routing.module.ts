import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { AppComponent } from './app.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { RecipesComponent } from './recipes/recipes.component';
import { UsersComponent } from './users/users.component';
import { RecipesDialogComponent } from './recipes-dialog/recipes-dialog.component';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ChangeDialogComponent } from './change-dialog/change-dialog.component';

const routes: Routes = [
  {path : "signupDialog", component : SignupDialogComponent},
  {path : "loginDialog", component : LoginDialogComponent},
  {path : "changedialog", component : ChangeDialogComponent},
  {path : "recipesDialog/:id", component : RecipesDialogComponent},
  {path : "usersDialog/:id", component : UsersDialogComponent},
  {path : "about", component : AboutComponent},
  {path : "account", component : AccountComponent},
  {path : "recipes", component : RecipesComponent},
  {path : "users", component : UsersComponent},
  {path : "dashboard", component : DashboardComponent},
  {path : "recipeDetail/:id", component : RecipeDetailComponent},
  {path : "", component : HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
