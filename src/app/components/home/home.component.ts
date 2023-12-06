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
export class HomeComponent implements OnInit {

    constructor(private LibrosService: LibrosService,
        private loginService: LoginService,
        private LibroStock: LibrosStockService) { }

    listadoLibros: Libro[] | undefined = [];
    listadoStock: LibroStock[] | undefined = [];

    ngOnInit(): void {
        this.mostrarLibrosHttp();
    }


    mostrarLibrosHttp() {
        this.LibrosService.getLibrosHttp().subscribe({
            next: (libros: Libro[]) => {
                // Obtener 3 índices aleatorios únicos
                const indicesAleatorios: number[] = [];
                while (indicesAleatorios.length < 3) {
                    const indiceAleatorio: number = Math.floor(Math.random() * libros.length);
                    if (!indicesAleatorios.includes(indiceAleatorio)) {
                        indicesAleatorios.push(indiceAleatorio);
                    }
                }

                // Obtener los objetos correspondientes a los índices aleatorios
                this.listadoLibros = indicesAleatorios.map((indice: number) => libros[indice]);

                console.log(this.listadoLibros);

                this.buscarCoincidenciasEnStock();

            },
            error: (error) => {
                console.log('No se pudo acceder a los libros', error);
            }
        });
    }

    buscarCoincidenciasEnStock() {
        if (this.listadoLibros && this.listadoLibros.length > 0) {
            // Obtener los IDs de los libros seleccionados
            const idsLibrosSeleccionados: number[] = this.listadoLibros.map(libro => libro.id);
            console.log(idsLibrosSeleccionados);

            for (let i = 0; i < idsLibrosSeleccionados.length; i++) {

                this.LibroStock.getLibroStockHttp(idsLibrosSeleccionados[i])
                    .subscribe(
                        {
                            next: (stock) => {
                                this.listadoStock?.push(stock);
                            },
                            error: (error) => {
                                console.log(error);
                            }
                        }
                    )
            }
            console.log(this.listadoStock);
        }
    }


}
