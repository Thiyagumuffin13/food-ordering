import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../productList/product.service';
import { Product } from '../model/product';
import { CartItem } from '../model/cart-item';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  selectedCategory: string = 'burger';
  totalPrice: number = 0;
  totalCount: number = 0; 
  cartItems: CartItem[] = []; 
   isCheckout: boolean = false;

  constructor(private router: Router){

  }
  ngOnInit() {} 

  onCategorySelected(category: string) {
    console.log("*********",category);

    this.selectedCategory = category;
  }

  updateTotalPrice(price: number) {
    this.totalPrice = price; 
  }

  updateTotalCount(count: number) {
    this.totalCount = count; 
  }
  makePayment() {
    // Mock a successful payment and navigate to the order confirmation page
    const orderNumber = this.generateOrderNumber();
    this.router.navigate(['/order-confirmation'], { queryParams: { orderNumber } });
  }

  generateOrderNumber() {
    return Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit number
  }

  

}
