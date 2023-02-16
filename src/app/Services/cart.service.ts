import { Injectable } from '@angular/core';
import { CartModel } from '../Models/cart-model';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  cartProducts: any;

  
  items: CartModel[] = [];

  constructor() { 
    let cart = localStorage.getItem("MyCart")
    if (cart){
      this.items = JSON.parse(cart)
    }
  }

  addToCart(product: CartModel ) {
    
    console.log(this.items)

    if (this.items.length > 0) {
      let result = this.items.some(
        (p) => p.product.id == product.product.id
      );
      switch (result) {
        case true:
          this.items.map((p) => {
            if (p.product.id == product.product.id)
            {
              p.quantity += product.quantity;
               
            }
          })
          break;
          default:
            this.items.push(product);
            break;
      }
    } else {
      this.items.push(product);
  }
  localStorage.setItem("MyCart",JSON.stringify(this.items))
}

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }


  removeItem(index: number){
    this.items.splice(index, 1);
}

  
  }