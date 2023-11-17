import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/libros';
import { LibroStock } from '../interfaces/libroStock';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  urlLibros:string='https://example-data.draftbit.com/books?_limit=100'
  urlLibro:string="https://example-data.draftbit.com/books"
  //urlP='http://localhost:3000/librosStock'
  listadoLibros:Libro[]=[]
  //listP: LibroStock[] = []

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

  async buscarLibroPorTitulo(titulo: string): Promise<Libro[] | undefined> {
    try {
      // Realizar la búsqueda por título y devolver los resultados
      const resultados = this.listadoLibros.filter(libro => libro.title.toLowerCase().includes(titulo.toLowerCase()));
      return resultados;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  
}
