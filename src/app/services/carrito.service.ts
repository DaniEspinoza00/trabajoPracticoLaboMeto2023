import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrito } from './../interfaces/itemCarrito';
import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/libros';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  cartProducts: ItemCarrito[] = []
  _products: BehaviorSubject<ItemCarrito[]>;

  constructor() {
    this._products = new BehaviorSubject<ItemCarrito[]>([]);
  }

  get products(){
    return this._products.asObservable();
  }

  addNewProduct(product: ItemCarrito){
    this.cartProducts.push(product);
    this._products.next(this.cartProducts);
  }

  reemplazarCarrito(list: ItemCarrito[]){
    this.cartProducts = list;
    this._products.next(this.cartProducts);
  }

  deleteProduct(index: number){
    this.cartProducts.splice(index, 1);
    this._products.next(this.cartProducts);
  }
}
