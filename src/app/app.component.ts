import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authSer: AuthService, private userSer: UserService, private _router: Router){}
  ngOnInit() {
    this.authSer.user$.subscribe(user=>{
      if(user){
        this.userSer.save(user);
        this._router.navigateByUrl(localStorage.getItem('returnUrl'));
      }
    })
  }
}
