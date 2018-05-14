import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../services/category.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/take";
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cateService: CategoryService,
    private _productService: ProductService,
    private _fb: FormBuilder) { }

  public categories$;
  ngOnInit() {
    this.categories$ = this._cateService.gets();
    this.createForm();
    this.loadProduct();
  }
  public product = {};
  public productID: string;
  loadProduct() {
    this.productID = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.productID) {
      this._productService.getOne(this.productID).subscribe(p => this.product = p);
    }
  }
  public productForm: FormGroup;
  createForm() {
    this.productForm = this._fb.group({
      title: ['', Validators.required],
      category: ['0', Validators.required],
      price: [0, Validators.required],
      imageURL: ['', Validators.required]
    })
  }
  onSubmit(product) {
    if (this.productID) {
      this._productService.getOneAndUpdate(this.productID, product);
    } else {
      this._productService.createProduct(product);
    }
    this._router.navigate(['/admin/products']);
  }
  onDelete(){
    if(confirm('Are you sure you want to delete this product ?')){
      this._productService.getOneAndDelete(this.productID);
      this._router.navigate(['/admin/products'])
    }
  }
}
