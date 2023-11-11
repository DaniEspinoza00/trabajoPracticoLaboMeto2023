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

  viajarATarjeta(){
    this.router.navigate(['agregar-tarjeta'])
  }

  verificarTrajeta(){
    if(this.user?.tarjetaCredito.numeroTarjeta != 0){
      // parte de agregar al historial
      localStorage.clear()
      this.listaItemsCarrito = []
      this.router.navigate(['felicidades'])
    }
    else{
      alert("El usuario no tiene ninguna tarjeta agregada")
      this.router.navigate(['agregar-tarjeta'])
    }
  }
}
