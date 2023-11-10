import { Component, OnInit } from '@angular/core';
import { Libro } from '../../interfaces/libros';
import { LoginService } from '../../services/usuario.service';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  flag1:boolean=false;
  flag2:boolean=false;
  listaLibros:Libro[]=[]
  listaFav:number[]=[]
  constructor(private loginSrvice:LoginService,private librosService:LibrosService){}
  
  ngOnInit(): void {
    if(this.loginSrvice.usuarioActual.id!=0){
      this.flag1=true
      if(this.loginSrvice.usuarioActual.favoritos.length!=0){
        this.flag2=true
        this.listaFav=this.loginSrvice.usuarioActual.favoritos
        this.igualarFavLibros()
      }
    }
    

  }

  igualarFavLibros(){
    for (var j=0;j<this.listaFav.length;j++){
      console.log(this.listaFav[j])
      for(var i=0;i<this.librosService.listadoLibros.length;i++){
        
        if(this.librosService.listadoLibros[i].id==this.listaFav[j]){
          
          this.listaLibros.push(this.librosService.listadoLibros[i])
        }
        
      }
    }  
  }

  eliminarFav(id:number,e:Event){
    e.preventDefault()
    this.loginSrvice.eliminarFav(id)
  }
}
