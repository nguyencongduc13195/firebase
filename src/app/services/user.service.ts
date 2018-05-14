import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AppUser } from './../models/user';
@Injectable()
export class UserService {

  constructor(private _angularFireDatabase: AngularFireDatabase) { }
  save(user: firebase.User) {
    this._angularFireDatabase.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
  get(user: firebase.User): FirebaseObjectObservable<AppUser> {
    return this._angularFireDatabase.object(`/users/${user.uid}`);
  }
}
