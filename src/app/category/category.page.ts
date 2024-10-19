import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  selectedCategory: any;
  productList: Product[] = [];
  totalPrice = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.selectedCategory$.subscribe(category => {
      console.log("---d----",category);
      
      this.selectedCategory = category;

      this.productService.productList$.subscribe(products => {
        this.productList = products;
        this.calculateTotal();
      });
    });
  }

  goToProducts(category: string) {
    this.productService.setCategory(category);
  }

  increaseCount(product: any) {
    product.count++;
    this.calculateTotal();
  }

  decreaseCount(product: any) {
    if (product.count > 0) {
      product.count--;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalPrice = this.productList.reduce((total, item: any) => total + (item.price * item.count), 0);
  }

  addToCart() {
    localStorage.setItem('cart', JSON.stringify(this.productList));
    this.router.navigate(['/checkout']);
  }

}
