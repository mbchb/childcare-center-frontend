import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/models/role';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: any = {
    username: null,
    password: null
  };
  public password: string;
  public isLoggedIn = false;
  isLoginFailed = false;
  roles: Role[] = [];
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  public onSubmit(): void {
    this.authService.login(this.form).subscribe(data => {
    this.tokenStorage.saveToken(data.access_token);
    this.tokenStorage.saveUser(data);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.roles = this.tokenStorage.getUser().roles;
    this.router.navigate(['/dashboard']);
  }, err => {
    this.errorMessage = err.error.message;
    this.isLoginFailed = true;
  }); 
  }

  reloadPage(): void {
    window.location.reload();
  }


  ngOnDestroy() {
  }

}
