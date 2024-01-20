import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AccountService } from 'src/services/account.service';
import { LoginService } from 'src/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-dialog',
  templateUrl: './change-dialog.component.html',
  styleUrls: ['./change-dialog.component.css']
})
export class ChangeDialogComponent {

  user : User = new User();
  constructor(private httpClient : HttpClient, private accountService : AccountService,
    private dialogRef: MatDialogRef<ChangeDialogComponent>,private router : Router, private loginService : LoginService){}

  onChangePassword(oldPassword: string, newPassword: string): void {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.error('Access token not found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    this.accountService.changePassword(oldPassword, newPassword, headers)
      .subscribe(
        response => {
          console.log(response.message);
          Swal.fire({
            icon: 'success',
            title: 'password changed successuflly !',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem('authToken');
              this.dialogRef.close();
              this.loginService.logout();
              this.router.navigate(['']);
            }
          }); // Handle success
        },
        error => {
          console.error(error.error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'sometihng went wrong.',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close();
            }
          });// Handle error
        }
      );
  }

}
