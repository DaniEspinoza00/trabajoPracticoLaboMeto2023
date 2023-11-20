import { LibrosService } from './../../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/interfaces/libros';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  listadoLibros:Libro[]|undefined=[];
  listadoGeneros:String[]=[];

  constructor(private router: Router,
              private LibrosService:LibrosService) {}
  ngOnInit(): void {
    this.getGeneros();
  }

  navigateToCategory(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    
    if (category) {
      this.router.navigate(['/categoria', category]);
    }
  }


  async getGeneros(){
    this.listadoLibros = await this.LibrosService.getLibros();

  // Verifica si se obtuvieron libros correctamente
  if (this.listadoLibros) {
    // Inicializa la lista de géneros como un conjunto para evitar duplicados
    const generosSet = new Set<string>();

    // Itera sobre los libros para obtener los géneros
    this.listadoLibros.forEach(libro => {
      // Divide la cadena de géneros (puede necesitar ajustes según el formato)
      const generosArray = libro.genres.split(',');

      // Añade cada género al conjunto
      generosArray.forEach(genero => generosSet.add(genero.trim()));
    });

    // Convierte el conjunto de géneros de nuevo a un array
    this.listadoGeneros = Array.from(generosSet);
  }
  }
}
