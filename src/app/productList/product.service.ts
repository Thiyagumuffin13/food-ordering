import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private categorySource = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.categorySource.asObservable();

  private productListSource = new BehaviorSubject<Product[]>([]);
  productList$ = this.productListSource.asObservable();

  private productState: { [key: string]: Product[] } = {
    burger: [
      { name: 'Zinger Burger', price: 5, description: 'Crispy chicken burger', image: 'assets/images/burger.jpg', count: 0 },
      { name: 'Double Decker', price: 7, description: 'Double chicken patty', image: 'assets/images/double_burger.jpg', count: 0 }
    ],
    roll: [
      { name: 'Chicken Roll', price: 4, description: 'Spicy chicken wrap', image: 'assets/images/roll.jpg', count: 0 }
    ],
  };

  private totalCountSource = new BehaviorSubject<number>(0);
  totalCount$ = this.totalCountSource.asObservable();

  private totalPriceSource = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSource.asObservable();

  setCategory(category: string) {
    console.log("--category---====");
    this.categorySource.next(category);
    this.setProductList(category);
    this.calculateTotals(); 
  }

  private setProductList(category: string) {
    console.log("--incurrentProducts");
    
    const newProducts = this.productState[category] || [];
    
    const existingProducts = this.productListSource.value;

    newProducts.forEach(newProduct => {
      const existingProduct = existingProducts.find(p => p.name === newProduct.name);
      if (existingProduct) {
        newProduct.count = existingProduct.count; 
      }
    });

    this.productListSource.next(newProducts);
    this.calculateTotals(); 
  }

  public calculateTotals() {
    const allProducts = Object.values(this.productState).reduce((acc, val) => acc.concat(val), []);
    const totalPrice = allProducts.reduce((total, product) => total + (product.price * product.count), 0);
    const totalCount = allProducts.reduce((count, product) => count + product.count, 0);
    
    // Assuming you have BehaviorSubjects for total price and count
    this.totalPriceSource.next(totalPrice);
    this.totalCountSource.next(totalCount);
  }

  clearProductList() {
    this.productListSource.next([]);
  }
}
