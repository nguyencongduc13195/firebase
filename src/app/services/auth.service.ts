import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './../models/user';
import { UserService } from '../services/user.service';
import 'rxjs/add/observable/of';
@Injectable()
export class AuthService {
  public user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private _router: ActivatedRoute, private _userService: UserService) {
    this.user$ = this.afAuth.authState;
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  login() {
    let returnUrl = this._router.snapshot.queryParamMap.get('returnUrl') || "/";
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  get AppUser$(): Observable<AppUser> {
    return this.user$.switchMap(user => {
      if (user) {
        return this._userService.get(user);
      }
      return Observable.of(null)
    }
    )
  }
}
