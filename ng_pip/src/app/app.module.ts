import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { ChangeDetectorRef } from '@angular/core';
import { RecipesComponent } from './recipes/recipes.component';
import { UsersComponent } from './users/users.component';
import { RecipesDialogComponent } from './recipes-dialog/recipes-dialog.component';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ChangeDialogComponent } from './change-dialog/change-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupDialogComponent,
    LoginDialogComponent,
    AboutComponent,
    HomeComponent,
    AccountComponent,
    RecipesComponent,
    UsersComponent,
    RecipesDialogComponent,
    UsersDialogComponent,
    DashboardComponent,
    RecipeDetailComponent,
    ChangeDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
