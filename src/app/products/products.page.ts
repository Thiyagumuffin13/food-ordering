import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  selectedCategory!: string;
  productList: Product[] = [];
  totalPrice = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.selectedCategory$.subscribe(category => {
      if (category) {
        this.selectedCategory = category;
        this.productService.productList$.subscribe(products => {
          this.productList = products;
        });
      }
    });
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
    // Save cart data for later steps
    localStorage.setItem('cart', JSON.stringify(this.productList));
  }

}
