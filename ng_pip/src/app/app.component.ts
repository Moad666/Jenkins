import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { LoginService } from 'src/services/login.service';
import { User } from 'src/models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'rc';

  constructor(public dialog: MatDialog, public loginService : LoginService, private router : Router,
    private httpClient : HttpClient, accountService : AccountService) {
      this.loginService.isSuperUser$ = this.loginService.checkIfSuperuser();

    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.loginService.authenticated$.next(true);
    }
  }

  goToAccount(){
    this.router.navigate(['/account']);
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The signup dialog was closed');
      // You can handle the result here if needed
    });
  }

}
