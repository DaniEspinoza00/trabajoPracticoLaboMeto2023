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

  async mostrarLibros() {
    try {
        const libros: any = await this.LibrosService.getLibros();
        if (libros) {
            // Obtener 3 índices aleatorios únicos
            const indicesAleatorios:any = [];
            while (indicesAleatorios.length < 3) {
                const indiceAleatorio = Math.floor(Math.random() * 100); // Suponiendo que el arreglo tiene 100 elementos
                if (!indicesAleatorios.includes(indiceAleatorio)) {
                    indicesAleatorios.push(indiceAleatorio);
                }
            }

            // Obtener los objetos correspondientes a los índices aleatorios
            this.listadoLibros = indicesAleatorios.map((indice: number)=> libros[indice]);

            console.log(this.listadoLibros);
        } else {
            console.log('No se pudo acceder a los libros');
        }
    } catch (error) {
        console.log(error);
    }
}


async mostrarStock() {
  try {
      const libros: any = await this.LibroStock.getStock();
      if (libros) {
          // Obtener 3 índices aleatorios únicos
          const indicesAleatorios: number[] = [];
          while (indicesAleatorios.length < 3) {
              const indiceAleatorio: number = Math.floor(Math.random() * 100); // Suponiendo que el arreglo tiene 100 elementos
              if (!indicesAleatorios.includes(indiceAleatorio)) {
                  indicesAleatorios.push(indiceAleatorio);
              }
          }

          // Obtener los objetos correspondientes a los índices aleatorios
          this.listadoStock = indicesAleatorios.map((indice: number) => libros[indice]);

          console.log(this.listadoStock);
      } else {
          console.log('No se pudo acceder a los libros');
      }
  } catch (error) {
      console.log(error);
  }
}


}
