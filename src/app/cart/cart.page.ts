import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../model/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartItems:CartItem[] = [];
  totalPrice = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cartItems = [
      {
        image: 'assets/images/burger.jpg',
        name: 'Classic Burger',
        description: 'A delicious classic burger with lettuce and tomato.',
        price: 5.99,
        count: 2
      },
      {
        image: 'assets/images/chicken.jpg',
        name: 'Chicken Bucket',
        description: 'A bucket full of crispy fried chicken.',
        price: 10.99,
        count: 1
      }
    ];
    
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).filter((item:any) => item.count > 0);
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item:any) => total + (item.price * item.count), 0);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
