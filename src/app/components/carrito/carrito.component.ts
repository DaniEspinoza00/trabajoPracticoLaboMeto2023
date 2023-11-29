import { LoginService } from './../../services/usuario.service';
import { CarritoService } from './../../services/carrito.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito';
import { Usuario } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  listaItemsCarrito: ItemCarrito[] = []
  user: Usuario | undefined


  constructor(private router: Router,
              private CarritoService:CarritoService,
              private LoginService:LoginService){
    
  }

  ngOnInit(): void{
    this.CarritoService.products.subscribe(products => {
      this.listaItemsCarrito = products
    })
  }

  verificarLogin(){
    this.user = this.LoginService.getUsuarioActual()
    console.log(this.LoginService.usuarioActual);
    console.log(this.listaItemsCarrito.length);
    if(this.listaItemsCarrito.length != 0){
      if(this.user.id === 0){
        this.router.navigate(['alerta-login'])
      }
      else{
        this.router.navigate(['compra'])
      }
    }
    else{
      alert("No hay ningun producto en el carrito")
      this.router.navigate(['home'])
    }
  }

  vaciarCarrito(){
    this.listaItemsCarrito = []
  }

  eliminarUnElemento(id: number) {
    if (this.listaItemsCarrito[id].cantidad === 1) {
      this.CarritoService.deleteProduct(id);
    }
    else {
      let itemCarrito: ItemCarrito = this.listaItemsCarrito[id]
      itemCarrito.cantidad!--
      itemCarrito.subtotal = itemCarrito.cantidad * itemCarrito.precio
      this.listaItemsCarrito[id] = itemCarrito
      this.CarritoService.reemplazarCarrito(this.listaItemsCarrito)
    }
  }

}
