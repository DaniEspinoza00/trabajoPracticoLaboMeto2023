import { Libro } from 'src/app/interfaces/libros';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-libros',
  templateUrl: './listar-libros.component.html',
  styleUrls: ['./listar-libros.component.css']
})
export class ListarLibrosComponent implements OnInit {
  
   constructor (private LibrosService:LibrosService) {}

   listadoLibros:Libro[] | undefined =[];
   listadoLibrosFiltrados:Libro[] | undefined =[];

  ngOnInit(): void {
    this.mostrarLibros();
  }
  
  async mostrarLibros(){
    this.listadoLibros=await this.LibrosService.getLibros();
    console.log(this.listadoLibros);
    if(this.listadoLibros){
      this.LibrosService.listadoLibros=this.listadoLibros
    }
  }


}
