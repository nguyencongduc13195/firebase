import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  constructor(private _productService: ProductService) { }
  public products: Product[];
  public filterProducts: Product[];
  private _sub: Subscription;
  ngOnInit() {
    this._sub = this._productService.getAll().subscribe(p => {
      this.filterProducts = this.products = p;
    });
  }
  filter(query) {
    this.filterProducts = query ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }
}
