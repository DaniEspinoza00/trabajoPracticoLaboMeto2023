import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/interfaces/libros';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  
  listadoLibros:Libro[] | undefined =[];
  listadoLibrosFiltrados:Libro[] | undefined =[];
  constructor (private route:ActivatedRoute,
              private LibrosService:LibrosService){}

  ngOnInit(): void {
    this.mostrarLibrosPorCategoria();
  }


  mostrarLibrosPorCategoria(){
    this.route.params.subscribe(async param=>{
      const genre:string=param['genre'];

      this.filtrarLibros(genre);
    })
  }


  async filtrarLibros(genre: string) {
    try {
      // Obtén la lista completa de libros
      const todosLosLibros = await this.LibrosService.getLibros();
  
      // Verifica si la respuesta es undefined o si hay un error
      if (todosLosLibros === undefined) {
        console.log('No se pudieron obtener los libros.');
        return;
      }
  
      // Filtra los libros por el género deseado
      this.listadoLibrosFiltrados = todosLosLibros.filter(libro => {
        // Supongo que los géneros están separados por comas en el campo 'genres'.
        // Puedes ajustar esto según la estructura real de datos.
        const generosDelLibro = libro.genres.split(',').map(genero => genero.trim());
  
        // Verifica si el género deseado está presente en los géneros del libro
        return generosDelLibro.includes(genre);
      });
  
      // Puedes imprimir la lista filtrada en la consola para verificar
      console.log(this.listadoLibrosFiltrados);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  }
  
}
