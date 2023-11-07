import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/libros';
import { Precio } from '../interfaces/precio';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  urlLibros:string='https://example-data.draftbit.com/books?_limit=100'
  urlLibro:string="https://example-data.draftbit.com/books"
  urlP='http://localhost:3000/librosStock'
  listadoLibros:Libro[]=[]
  listP: Precio[] = []

  constructor() { }

  async getLibros(): Promise<Libro[] | undefined>{
    try {
      const resultado = await fetch (this.urlLibros);
      const libros = await resultado.json();
      this.listadoLibros=libros
      return libros;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async getLibro(id: number): Promise<Libro | undefined> {
    try {
      const resultado = await fetch(`${this.urlLibro}/${id}`);
      const libro = await resultado.json();
      return libro;
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

  async getPrecios(){
    
    try {
      const result = await fetch(this.urlP)
      const listaPrecios = await result.json()

      return listaPrecios
    } catch (error) {
      console.log(error);
    }
  }

  async getPrecio(id: number){
    
    try {
      const result = await fetch(`${this.urlP}/${id}`)
      const listaPrecios = await result.json()
      return listaPrecios
    } catch (error) {
      console.log(error);
    }
  }



  
}
