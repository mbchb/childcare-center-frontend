import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/core/models/role';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public user: User = new User();
  public role: string;
  public isUserUpdated = false;
  public errormessage='';
  public userUpdatedError = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {

    this.userService.getUserByUserName(JSON.parse(sessionStorage.getItem('auth-user')).sub).subscribe(
      (user: User) => {
      this.user = user;
      this.role = user.roles[0].name;
    });
  }

  editUser(user: User) {
    this.userService.updateUser(user).subscribe(()=> {
      this.isUserUpdated = true;
    }, err => {
      this.errormessage = err.error.message;
      this.userUpdatedError = true;
    });
  }
}
