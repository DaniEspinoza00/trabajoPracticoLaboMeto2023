import { Injectable } from '@angular/core';
import { LibroStock } from '../interfaces/libroStock';

@Injectable({
  providedIn: 'root'
})
export class LibrosStockService {

  urlStock:string = "http://localhost:3000/librosStock";
  ListadoStock:LibroStock [] |undefined=[];

  constructor() { }

  async getStock(): Promise<LibroStock[] | undefined>{
    try {
      const resultado = await fetch (this.urlStock);
      const libros = await resultado.json();
      return libros;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }


  async getLibroStock(id:number): Promise<LibroStock | undefined>{
    try {
      const resultado = await fetch(`${this.urlStock}/${id}`);
      const libro = await resultado.json();
      return libro;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }
}

