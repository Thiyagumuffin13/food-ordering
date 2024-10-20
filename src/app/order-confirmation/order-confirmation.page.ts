import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../productList/product.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  orderNumber!: string;

  constructor(private route: ActivatedRoute, private router: Router,private productService: ProductService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderNumber = params['orderNumber'];
    });
  }

  goToHome() {
    // Navigate back to the landing page after order confirmation
    localStorage.removeItem('cart');
    this.productService.clearProductList();
    this.router.navigate(['/landing']);
  }
}
