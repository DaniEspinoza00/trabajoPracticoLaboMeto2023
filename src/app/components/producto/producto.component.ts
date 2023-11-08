import { CarritoService } from './../../services/carrito.service';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Libro } from './../../interfaces/libros';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito';
import { LoginService } from 'src/app/services/usuario.service';
import { LibrosStockService } from 'src/app/services/libro-stock.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  libro:Libro|undefined;
  libro2:Libro|undefined;
  libroStock:LibroStock|undefined;//cambiado de precio a 
  list: Libro[] = []
  listP: LibroStock[] = []

  constructor(private LibrosService:LibrosService,
              private LibroStock:LibrosStockService,
              private route:ActivatedRoute,
              private CarritoService:CarritoService,
              private loginService: LoginService){}

  ngOnInit(): void {
    this.mostrarLibro2();
    this.mostrarPrecio2();
  }

  mostrarLibro2(){
    this.route.params.subscribe(async param=>{
      const id = param ['id'];
      console.log(id);
      this.libro2 = await this.LibrosService.getLibro(id);
      console.log(this.libro2);
    })
  }

  async mostrarPrecio2(){
    this.route.params.subscribe(async param=>{
      const id = param ['id'];
      this.libroStock=await this.LibroStock.getLibroStock(id);
      console.log(this.libroStock);
    })
  }

  // onClick(item: Libro, precio: number){
  //   this.CarritoService.agregarAlCarrito(item, precio)
  // }

  agregarCarrito(item: Libro, precio: number){

    let iCarrito: ItemCarrito = {
      id: item.id,
      titulo: item.title,
      edicion: item.edition,
      image_url: item.image_url,
      cantidad: 1,
      precio: precio,
    }
    iCarrito.subtotal = iCarrito.precio * iCarrito.cantidad

    if(localStorage.getItem("carrito") === null)
    {
      let carrito: ItemCarrito[] = []
      carrito.push(iCarrito)
      localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    else{
      let carritoStorage = localStorage.getItem("carrito") as string
      let carrito = JSON.parse(carritoStorage)
      let index = -1

      for (let i = 0; i < carrito.length; i++) {
        let itemC : ItemCarrito = carrito[i]
        if(iCarrito.id === itemC.id)
        {
          index = i
          break
        }
      }

      if(index === -1){
        console.log(iCarrito);
        carrito.push(iCarrito)
        localStorage.setItem("carrito", JSON.stringify(carrito))
      }
      else{
        let itemCarrito: ItemCarrito = carrito[index]
        itemCarrito.cantidad!++
        itemCarrito.subtotal = itemCarrito.precio! * itemCarrito.cantidad!
        carrito[index] = itemCarrito
        localStorage.setItem("carrito", JSON.stringify(carrito))
      }
    }
  }

  agregarFavorito(idNuevo:number){
    this.loginService.usuarioActual.favoritos.push(idNuevo)
    this.loginService.modifJson(this.loginService.usuarioActual)
  }

}
