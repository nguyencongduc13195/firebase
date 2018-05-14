import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import {AppUser} from '../../models/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public _authService: AuthService) {}
  public appUser: AppUser;
  ngOnInit() {
    this._authService.AppUser$.subscribe(appUser=> this.appUser = appUser);
  }
  logout() {
    this._authService.logout();
  }

}
