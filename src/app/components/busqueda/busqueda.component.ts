import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Libro } from 'src/app/interfaces/libros';
import { LibrosStockService } from 'src/app/services/libro-stock.service';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit{

  listadoLibros:Libro[] | undefined =[];
  listadoLibrosFiltrados:Libro[] =[];
  stockID:LibroStock[]|undefined=[];

  constructor(private route:ActivatedRoute,
              private LibrosService:LibrosService,
              private LibrosStockService:LibrosStockService){}

  ngOnInit(): void {
    this.mostrarLibrosPorBusqueda();
  }

  mostrarLibrosPorBusqueda(){
    this.route.params.subscribe(async param=>{
      const search:string=param['search'];

      this.filtrarLibros(search);
    })
  }



  async filtrarLibros(search: string) {
    try {
      // Obtén la lista completa de libros
      const todosLosLibros = await this.LibrosService.getLibros();
  
      // Verifica si la respuesta es undefined o si hay un error
      if (todosLosLibros === undefined) {
        console.log('No se pudieron obtener los libros.');
        return;
      }
  
      // Filtra los libros por el título deseado
      this.listadoLibrosFiltrados = todosLosLibros.filter(libro => {
        // Convierte el título y la búsqueda a minúsculas para hacer la comparación sin distinción entre mayúsculas y minúsculas
        const tituloDelLibro = libro.title.toLowerCase();
        const busquedaEnMinusculas = search.toLowerCase();
  
        // Verifica si la palabra de búsqueda está presente en el título del libro
        return tituloDelLibro.includes(busquedaEnMinusculas);
      });
      this.stockID = [];
  
      // Puedes imprimir la lista filtrada en la consola para verificar
       console.log(this.listadoLibrosFiltrados);
      this.mostrarPrecioIDstock(this.listadoLibrosFiltrados);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  }
  
  async mostrarPrecioIDstock(librosFiltrados: Libro[]) {
    const resultado = await this.LibrosStockService.getStock();
  
    if (resultado === undefined) {
      console.log("No se obtuvo nada");
      return;
    }
  
    let j = 0;
    for (let i = 0; i < resultado.length && j < librosFiltrados.length; i++) {
      if (librosFiltrados[j].id !== undefined && librosFiltrados[j].id === resultado[i].id) {
        this.stockID?.push(resultado[i]);
        j++;
      }
    }
  }
  
}
