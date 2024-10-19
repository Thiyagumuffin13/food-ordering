import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private categorySource = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.categorySource.asObservable();

  private productListSource = new BehaviorSubject<Product[]>([]);
  productList$ = this.productListSource.asObservable();
  private currentProducts: Product[] = [];


  setCategory(category: string) {
    this.categorySource.next(category);
    this.setProductList(category);
  }

  private setProductList(category: string) {
    const sampleProducts: { [key: string]: Product[] } = {
      burgers: [
        { name: 'Zinger Burger', price: 5, description: 'Crispy chicken burger', image: 'assets/images/burger.jpg', count: 0 },
        { name: 'Double Decker', price: 7, description: 'Double chicken patty', image: 'assets/images/double_burger.jpg', count: 0 }
      ],
      rolls: [
        { name: 'Chicken Roll', price: 4, description: 'Spicy chicken wrap', image: 'assets/images/roll.jpg', count: 0 }
      ]
    };
    this.currentProducts = [...this.productListSource.value];
    console.log("---currentProducts---",this.currentProducts);

    const newProducts = sampleProducts[category] || [];
    newProducts.forEach(newProduct => {
      console.log("---new---",newProduct);

      const existingProduct = this.currentProducts.find(p => p.name === newProduct.name);
      console.log("---exiting---",existingProduct);
      
      if (existingProduct) {
        newProduct.count = existingProduct.count;
      }
    });

    this.productListSource.next(newProducts);
  }
  clearProductList() {
    this.productListSource.next([]);
  }
}
