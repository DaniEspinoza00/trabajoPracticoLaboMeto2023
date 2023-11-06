import { Libro } from 'src/app/interfaces/libros';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { Precio } from 'src/app/interfaces/precio';

@Component({
  selector: 'app-listar-libros',
  templateUrl: './listar-libros.component.html',
  styleUrls: ['./listar-libros.component.css']
})
export class ListarLibrosComponent implements OnInit {
  
   constructor (private LibrosService:LibrosService) {}

   listadoLibros:Libro[] | undefined =[];
   listadoLibrosFiltrados:Libro[] | undefined =[];
   listP: Precio[] = []

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

  // async mostrarPrecios(){
  //   this.listP = await this.LibrosService.getPrecios()
  //   if(this.listP){
  //     this.LibrosService.listP=this.listP
  //   }
  // }

  /* async mostrarLibros2(){
    this.listadoLibros=await this.LibrosService.getLibros();
  }
 */
}
