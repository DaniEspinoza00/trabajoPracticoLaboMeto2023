import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/libros';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  urlLibros:string='https://example-data.draftbit.com/books?_limit=100'


  constructor() { }

  async getLibros(): Promise<Libro[] | undefined>{
    try {
      const resultado = await fetch (this.urlLibros);
      const libros = await resultado.json();
      return libros;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }
  

  async getLibrosGenero(genero:string): Promise < Libro[] | undefined >{
    try {
      const resultado = await fetch (`${this.urlLibros}/${genero}`)
      const libros = resultado.json();
      return libros;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }
  
}
