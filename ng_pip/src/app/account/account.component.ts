import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EMPTY, Observable, map, switchMap, throwError } from 'rxjs';
import { User } from 'src/models/user';
import { AccountService } from 'src/services/account.service';
import { ChangeDialogComponent } from '../change-dialog/change-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{


  constructor(private httpClient: HttpClient, private accountService : AccountService,
    public dialog: MatDialog,private router : Router) { }
  userProfile: any;
  apiUrl = 'http://127.0.0.1:8000/api/user_profile/';

  getUserProfile(): Observable<any> {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      // Handle the case where the access token is not available
      console.error('Access token not found in localStorage');
      return EMPTY; // You can return an empty observable or handle it as needed
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    return this.httpClient.get(this.apiUrl, { headers }).pipe(
      map((response: any) => {
        // Assuming the API response has properties username, email, and date_joined
        return {
          username: response.username,
          email: response.email,
          date_joined: response.date_joined,
        };
      })
    );
  }

  ngOnInit(): void {
    this.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data;
        console.log('User Profile:', this.userProfile);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  openChangeDialog(): void {
    const dialogRef = this.dialog.open(ChangeDialogComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The signup dialog was closed');
      // You can handle the result here if needed
    });
  }


}
