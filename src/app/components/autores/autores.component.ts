import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Libro } from 'src/app/interfaces/libros';
import { LibrosStockService } from 'src/app/services/libro-stock.service';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit{
  
  listadoLibros:Libro[] | undefined =[];
  listadoLibrosFiltrados:Libro[] =[];
  stockID:LibroStock[]|undefined=[];

  constructor (private route:ActivatedRoute,
    private LibrosService:LibrosService,
    private LibrosStockService:LibrosStockService){}
  
  
  ngOnInit(): void {
   this.mostrarLibrosPorAutores(); 
  }

  mostrarLibrosPorAutores(){
    this.route.params.subscribe(async param =>{
      const author:string=param['authors']
      this.filtrarLibros(author);
    })
  }


  async filtrarLibros(author: string){
    try {
      // Obtén la lista completa de libros
      const todosLosLibros = await this.LibrosService.getLibros();
  
      // Verifica si la respuesta es undefined o si hay un error
      if (todosLosLibros === undefined) {
        console.log('No se pudieron obtener los libros.');
        return;
      }
  
      // Filtra los libros por el autor deseado
      this.listadoLibrosFiltrados = todosLosLibros.filter(libro => {
        // Supongo que cada libro tiene un solo autor en la cadena 'authors'.
        // Puedes ajustar esto según la estructura real de datos.
        return libro.authors.trim() === author.trim();
      });
  
      this.stockID = [];
  
      // Puedes imprimir la lista filtrada en la consola para verificar
       console.log(this.listadoLibrosFiltrados);
  
      // Llama a la función existente para mostrar precios e ID de stock
      this.mostrarPrecioIDstock(this.listadoLibrosFiltrados);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  }

  async mostrarPrecioIDstock(librosFiltrados:Libro[]) {
    const resultado = await this.LibrosStockService.getStock();
  
    if(resultado === undefined){
      console.log("No se obtuvo nada");
      return;
    }
    let j=0;
    for(let i=0;i<resultado.length;i++){
      if(librosFiltrados[j].id===resultado[i].id){
        this.stockID?.push(resultado[i])
        j++;
      }
    }

  }
}
