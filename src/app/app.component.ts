import { Component } from '@angular/core';
import { Role } from './core/models/role';
import { TokenStorageService } from './core/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KidZone';
  private roles: any[];
  isLoggedIn = false;
  username: string;

  constructor(
    /*private tokenStorageService: TokenStorageService*/
    ) {}

  /*ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }*/
}
