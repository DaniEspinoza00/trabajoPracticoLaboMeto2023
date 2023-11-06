import { LoginService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito';
import { Usuario } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit{
  listaItemsCarrito: ItemCarrito[] = []
  user: Usuario | undefined


  constructor(private router: Router,
              private LoginService:LoginService){
    
  }

  ngOnInit(): void{
    let carritoStorage = localStorage.getItem("carrito") as string
    let carrito = JSON.parse(carritoStorage)
    this.listaItemsCarrito = carrito
    this.user = this.LoginService.getUsuarioActual()
  }

  calcularTotalAPagar(){
    let result = 0
    for(let i = 0; this.listaItemsCarrito.length > i; i++){
      result += this.listaItemsCarrito[i].subtotal!
    }
    return result
  }

  verificarTrajeta(){
    if(this.user?.tarjetaCredito){
      // parte de agregar al historial
      console.log(this.LoginService.usuarioActual)
      localStorage.clear()
      console.log(this.LoginService.usuarioActual)
      this.listaItemsCarrito = []
      // agregar redireccion de ruta a page c/mensaje de agradecimiento
    }
    else{
      // alerta de q el usuario no tiene tarj, luego redireccionar a page agregar tarjeta
    }
  }
}
