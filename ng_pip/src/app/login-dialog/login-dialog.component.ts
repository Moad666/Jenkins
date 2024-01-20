import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { LoginService } from 'src/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent{
  user : User = new User();
  constructor(public dialog: MatDialog,private dialogRef: MatDialogRef<LoginDialogComponent>,
    private loginService : LoginService,  private route : ActivatedRoute,private router : Router) {}


  openSignupDialog(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The signup dialog was closed');
      // You can handle the result here if needed
    });
  }

  loginUser(user : User): void{
    if (!user.username || !user.password) {
      // Handle empty fields
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required. Please fill them out.',
        confirmButtonText: 'OK'
      });
      return;
    }
    this.loginService.loginUser(user).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Welcome !',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialogRef.close();
            this.loginService.checkIfSuperuser().subscribe((isSuperuser) => {
              if (isSuperuser) {
                this.router.navigate(['/dashboard']);
              } else {
                this.router.navigate(['/account']);
              }
            });
          }
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'user doesn\'t exist.',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialogRef.close();
          }
        });
        console.error('Error login user:', error);
    });
}}
