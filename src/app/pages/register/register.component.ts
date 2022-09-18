import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/models/role';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { RoleService } from 'src/app/core/services/role.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userInfoForm: any = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: null,
    password: '',
    description: ''

  };
  public user: User;
  public roles: Role[];
  private roleSelected: Role;
  errorMessage = '';
  signupFailed = false;

  constructor(
    private authService: AuthService,
    public userService: UserService,
    public roleService: RoleService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.roleService.getAllRoles().subscribe((roles: Role[])=> {
      this.roles = roles;
    });
    this.user = new User();
  }

  public selectRole(role: Role) {
    this.roleSelected = role;
  }

  
  public onSubmit() {
    this.user = new User(null,this.userInfoForm.username, this.userInfoForm.firstName, this.userInfoForm.lastName,
      this.userInfoForm.email, this.userInfoForm.password, this.userInfoForm.description, this.userInfoForm.phoneNumber);
    this.user.roles = [];
    this.user.roles.push(this.roleSelected);
    this.authService.signup(this.user).subscribe((user: any) => {
    this.router.navigate(['/login']);
    }, err => {
      this.errorMessage = err.error.message;
      this.signupFailed = true;
    });
}

}
