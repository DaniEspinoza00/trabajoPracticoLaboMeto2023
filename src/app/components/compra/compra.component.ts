import { LibrosStockService } from './../../services/libro-stock.service';
import { LoginService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito';
import { Usuario } from 'src/app/interfaces/usuarios';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Ventas } from 'src/app/interfaces/ventas';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit{
  listaItemsCarrito: ItemCarrito[] = []
  user: Usuario | undefined
  stock: LibroStock | undefined



  constructor(private router: Router,
              private loginService:LoginService,
              private CarritoService:CarritoService,
              private LibrosStockService:LibrosStockService){
    
  }

  ngOnInit(): void{
    this.CarritoService.products.subscribe(products => {
      this.listaItemsCarrito = products
    })

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

  async verificarTrajeta(){
    if(this.user?.tarjetaCredito.numeroTarjeta != 0){
      
      for(let i = 0; i < this.listaItemsCarrito.length; i++){
        this.stock = await this.LibrosStockService.getLibroStock(this.listaItemsCarrito[i].id)
        console.log(`item ${i} antes: ${this.stock!.stock} `);
        this.stock!.stock--
        await this.LibrosStockService.putStock(this.stock!)
        console.log(`item ${i} despues: ${this.stock!.stock} `);
      }
      this.agregarHistorial()
      localStorage.clear()
      this.listaItemsCarrito = []
      this.router.navigate(['felicidades'])
    }
    else{
      alert("El usuario no tiene ninguna tarjeta agregada")
      this.router.navigate(['agregar-tarjeta'])
    }
  }

  agregarHistorial(){
    let cambio:Usuario=this.loginService.usuarioActual
    let nuevo:Ventas={fecha: new Date(),pedidos:this.listaItemsCarrito,total:this.calcularTotalAPagar()}
 
    cambio.historial.push(nuevo)
    this.loginService.modifJson(cambio)
  }

  volverACarrito(){
    this.router.navigate(['carrito'])
  }
}
