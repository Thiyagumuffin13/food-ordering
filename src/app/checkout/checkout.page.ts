import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartItems = [];
  totalPrice = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).filter((item:any) => item.count > 0);
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item:any) => total + (item.price * item.count), 0);
  }

  makePayment() {
    // Mock a successful payment and navigate to the order confirmation page with random order number
    const orderNumber = this.generateOrderNumber();
    this.router.navigate(['/order-confirmation'], { queryParams: { orderNumber } });
  }

  generateOrderNumber() {
    return Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit number
  }

}
