import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/interfaces/libros';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component {
  
  listadoLibros:Libro[]|undefined=[];
  listadoAutores:String[]=[];
  listadoGeneros:String[]=[];

  constructor(private router: Router,
    private LibrosService:LibrosService) {}

    ngOnInit(): void {
      this.getAutores();
    }
  


  navigateToCategory(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    
    if (category) {
      this.router.navigate(['/autores', category]);
    }
  }

  async getAutores() {
    // Obtén los libros
    this.listadoLibros = await this.LibrosService.getLibros();
  
    // Verifica si se obtuvieron libros correctamente
    if (this.listadoLibros) {
      // Extrae los autores y crea la lista de autores únicos
      this.listadoAutores = this.listadoLibros.map(libro => libro.authors.trim());
  
      // Elimina duplicados convirtiendo el array a un conjunto y luego de nuevo a un array
      this.listadoAutores = Array.from(new Set(this.listadoAutores));
    }
  }
}
