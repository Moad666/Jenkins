import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { UsersService } from 'src/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css']
})
export class UsersDialogComponent implements OnInit{

  constructor(private userService : UsersService,private router : Router,private route : ActivatedRoute){}

  id : number | undefined;
  user : User = new User();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  this.userService.getUserById(this.id).subscribe(data =>{
    this.user = data;
  });
  }
  goToUserPage(){
    this.router.navigate(['/users']);
  }

  onSubmit(){
    this.userService.updateUser(this.id, this.user).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'User updated Successfully!',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      this.goToUserPage();
    });
  }


}
