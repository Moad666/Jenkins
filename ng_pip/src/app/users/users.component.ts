import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { UsersService } from 'src/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{


  constructor(private userService : UsersService,private router : Router ){}
  users : User[] | undefined;
  user : User = new User();


  private getUsers(){
    this.userService.getUsersList().subscribe(data => {
    this.users = data;
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngSubmit(){
    this.createUser();
  }

  createUser() {
    // Check if passwords match
    if (this.user.password !== this.user.password_confirm) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match.',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      });
      return; // Exit the method if passwords do not match
    }

    // Continue with user creation API call
    this.userService.createUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'User Created Successfully!',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      },
      (error) => {
        console.error('Error creating user:', error);

        let errorMessage = 'An error occurred while creating the user.';
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



      deleteUser(id : number|undefined){
        this.userService.deleteUser(id).subscribe(data =>{
          console.log(data);
          Swal.fire({
            icon: 'error',
            title: 'User deleted Successfully!',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          }).then((result)=>{
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        });
      }

      updateUser(id : number | undefined){
        this.router.navigate(['usersDialog', id]);
          }
}
