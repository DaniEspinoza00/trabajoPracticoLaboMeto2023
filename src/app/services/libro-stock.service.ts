import { Injectable } from '@angular/core';
import { LibroStock } from '../interfaces/libroStock';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LibrosStockService {

  urlStock:string = "http://localhost:3000/librosStock";
  ListadoStock:LibroStock [] |undefined=[];

  constructor(private router:Router) { }

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


  
  async putLibro (libro:LibroStock){
    try {
      await fetch(`${this.urlStock}/${libro.id}`, {method:'PUT',
      body: JSON.stringify(libro),
      headers:{'Content-type': 'application/json'}})
      this.router.navigate (['admin'])
    } catch (error) {
      console.log(error);
    }
  }

  async putStock(stock: LibroStock | null){
    try {
      await fetch(`${this.urlStock}/${stock?.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(stock),
          headers: { 'Content-type': 'application/json' }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
}

