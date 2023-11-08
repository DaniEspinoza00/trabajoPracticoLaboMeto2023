import { LibrosStockService } from './../../services/libro-stock.service';
import { Libro } from 'src/app/interfaces/libros';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/usuario.service';
import { LibroStock } from 'src/app/interfaces/libroStock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private LibrosService:LibrosService, 
              private loginService: LoginService,
              private LibroStock:LibrosStockService){}

  listadoLibros:Libro[] | undefined =[];
  listadoStock:LibroStock [] | undefined=[];

  ngOnInit(): void {
    this.mostrarLibros();
    console.log(this.loginService.usuarioActual)
    this.mostrarStock();
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

   async mostrarStock(){
    try{
      const libros:any = await this.LibroStock.getStock();
    if(libros){
      this.listadoStock=libros.slice(0, 3);
      console.log(this.listadoStock);
    }else{
      console.log('No se pudo acceder a los libros');
    }
    }catch(error){
      console.log(error);
    }
  }
}
