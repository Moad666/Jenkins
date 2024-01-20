import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from 'src/models/user';
import { SignupService } from 'src/services/signup.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';




@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent {
  user : User = new User();
  constructor(public dialog: MatDialog,
    private dialogRef: MatDialogRef<SignupDialogComponent>,
    private signupService: SignupService,
    private route : ActivatedRoute,
    private router : Router){}

  openLoginDialog():void{
    this.dialogRef.close();
    const dialogRef = this.dialog.open(LoginDialogComponent,{
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The login dialog was closed');
    });
  }



  /*createUser(user : User): void{
    this.signupService.createUser(user).subscribe(
      (response)=>{
        Swal.fire({
          icon: 'success',
      title: 'User created Successfully!',
      showConfirmButton: true,
      confirmButtonText: 'OK'
        }).then((result)=>{
          if (result.isConfirmed) {
            this.goToHome();
          }
          else if (result.isDismissed) {
            // Handle dismissal (e.g., user clicked outside the modal)
            Swal.fire({
              icon: 'error',
              title: 'User creation failed',
              text: 'There was an error creating the user. Please try again.',
              confirmButtonText: 'OK'
            });
          }else if(user.password !== user.password_confirm){
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Passwords do not match. Please enter matching passwords.',
              confirmButtonText: 'OK'
            });
          }
          else if(!user.username || !user.email || !user.password || !user.password_confirm){
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'All fields are required. Please fill them out.',
              confirmButtonText: 'OK'
            });
          }else if(user.password.length < 8){
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Password is to short.',
              confirmButtonText: 'OK'
            });
          }
          });
      }
    )
  }*/

  createUser(user: User): void {
    // Validation checks
    if (!user.username || !user.email || !user.password || !user.password_confirm) {
      // Handle empty fields
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required. Please fill them out.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (user.password !== user.password_confirm) {
      // Handle password mismatch
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match. Please enter matching passwords.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (user.password.length < 8) {
      // Handle password length less than 8 characters
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Password must be at least 8 characters long.',
        confirmButtonText: 'OK'
      });
      return;
    }

    // If all validations pass, proceed with user creation
    this.signupService.createUser(user).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'User created Successfully!',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialogRef.close();
          }
        });
      },
      (error) => {
        // Handle other errors, if any
        console.error('Error creating user:', error);

        // Check for server-side validation error for password mismatch
        if (error && error.error && error.error.password) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Passwords do not match. Please enter matching passwords.',
            confirmButtonText: 'OK'
          });
        } else {
          // Generic error message for other errors
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'The username is already taken ! please change it',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }

}
