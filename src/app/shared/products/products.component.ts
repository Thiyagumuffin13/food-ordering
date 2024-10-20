import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/productList/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit,OnChanges {
  @Input() selectedCategory: string = 'burger';
  @Output() totalCountChange = new EventEmitter<number>();

 // totalCount: number = 0;
  totalPrice: number = 0;

  // selectedCategory!: string;
   productList: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("=====chnages====",this.selectedCategory);

    this.productService.setCategory(this.selectedCategory);
  }
  ngOnInit() {
    this.productService.selectedCategory$.subscribe(category => {
      console.log(this.productList,"=====categ====",category);
      if (category) {
        this.selectedCategory = category;
        this.productService.productList$.subscribe(products => {
          this.productList = products;
          console.log("=====er====",this.productList);
          this.calculateTotal();
          
        });
      }
    });
    this.productService.totalPrice$.subscribe(price => {
      console.log("--pric---",price);
      
      this.totalPrice = price;
    });

    this.productService.totalCount$.subscribe(count => {
      console.log("--count---",count);
    //  this.totalCount = count;
      this.totalCountChange.emit(count);
    });
  }

 

  increaseCount(product: any) {
    product.count++;
    this.productService.calculateTotals(); 
  }

  decreaseCount(product: any) {
    if (product.count > 0) {
      product.count--;
      this.productService.calculateTotals(); 
    }
  }

  calculateTotal() {
    this.totalPrice = this.productList.reduce((total, item: any) => total + (item.price * item.count), 0);
    //this.totalCount = this.productList.reduce((count, item: any) => count + item.count, 0); 

    this.productService.calculateTotals();
    localStorage.setItem('cart', JSON.stringify(this.productList));
  }

}
