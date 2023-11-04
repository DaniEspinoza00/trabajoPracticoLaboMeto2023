import { Libro } from 'src/app/interfaces/libros';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private LibrosService:LibrosService){}

  listadoLibros:Libro[] | undefined =[];

  ngOnInit(): void {
    this.mostrarLibros();
  }

  async mostrarLibros(){
    try{
      const libros:any = await this.LibrosService.getLibros();
    if(libros){
      this.listadoLibros=libros.slice(0, 3);//aca falta un libros.items.slice
      console.log(this.listadoLibros);
    }else{
      console.log('No se pudo acceder a los libros');
    }
    }catch(error){
      console.log(error);
    }
  }

}
