import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class ProductService {

  constructor(private _db: AngularFireDatabase) { }
  createProduct(product){
    return this._db.list('/products').push(product);
  }
  getAll() {
    return this._db.list('/products');
  }
  getOne(uid) {
    return this._db.object('/products/'+uid);
  }
  getOneAndUpdate(uid, product) {
    return this._db.object('/products/'+uid).update(product);
  }
  getOneAndDelete(uid) {
    return this._db.object('/products/'+uid).remove();
  }
}
