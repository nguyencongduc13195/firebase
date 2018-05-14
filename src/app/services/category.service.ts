import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }
  gets(){
    return this.db.list('/categories', {query: {orderByChild: 'name'}});
  }
}
