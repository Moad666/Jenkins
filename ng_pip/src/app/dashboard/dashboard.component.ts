import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/models/recipe';
import { DashboardService } from 'src/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private router : Router,private dashboardService : DashboardService ){}
  recipeCount: number | undefined;
  userCount : number | undefined;
  ratingCount : number | undefined;
  commentCount : number | undefined;

  ngOnInit(): void {
    this.countRecipes();
    this.countUsers();
    this.countRating();
    this.countComment();
  }
  private countRecipes() {
    this.dashboardService.countRecipes().subscribe(response => {
      this.recipeCount = response.recipe_count;
    });
  }

  private countUsers() {
    this.dashboardService.countUsers().subscribe(response => {
      this.userCount = response.user_count;
    });
  }

  private countRating() {
    this.dashboardService.countRating().subscribe(response => {
      this.ratingCount = response.rating_count;
    });
  }

  private countComment() {
    this.dashboardService.countComment().subscribe(response => {
      this.commentCount = response.comment_count;
    });
  }

}
