import { Router } from '@angular/router';
import { LibrosService } from './../../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  flag: boolean=false;
  tituloLibro: string = '';
  constructor (private loginService: LoginService,
    private LibrosService:LibrosService,
    private Router:Router){}

  ngOnInit(){
    if (this.loginService.usuarioActual.id!=0){
      this.flag=true
    }
  }
    //----------------//
    async buscarLibro() {
      console.log("se ejecuta");
      try {
        const resultados = await this.LibrosService.buscarLibroPorTitulo(this.tituloLibro);
        // Hacer algo con los resultados, por ejemplo, mostrarlos en la consola
        console.log(resultados);
  
        if(resultados){
          this.Router.navigate(['/producto', resultados[0]?.id]);
        } 
      } catch (error) {
        console.error(error);
      }
    }
  
}
