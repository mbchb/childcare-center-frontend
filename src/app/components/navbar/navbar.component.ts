import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public isLoggedIn = false;
  public user: User;

  constructor(location: Location,  private element: ElementRef, private router: Router,
     private tokenStorageService: TokenStorageService, private userService: UserService) {
    this.location = location;
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getUser();
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  getUser() {

    this.userService.getUserByUserName(JSON.parse(sessionStorage.getItem('auth-user')).sub).subscribe((user: User) => {
      this.user = user;
    });
  }

  logout() {
    this.tokenStorageService.logout();
    this.router.navigate(['/login']);
  }
}
