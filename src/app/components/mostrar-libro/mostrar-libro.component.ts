import { LibrosService } from './../../services/libros.service';
import { LibrosStockService } from 'src/app/services/libro-stock.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Libro } from 'src/app/interfaces/libros';

@Component({
  selector: 'app-mostrar-libro',
  templateUrl: './mostrar-libro.component.html',
  styleUrls: ['./mostrar-libro.component.css']
})
export class MostrarLibroComponent implements OnInit {

  libro: Libro | undefined;
  stock: LibroStock | undefined;

  formulario:FormGroup = this.formsBuilder.group({
    title: [''],
    authors: [''],
    edition: ['-'],
    precio: [0, [Validators.required]],
    id:[0],
    stock: [0, [Validators.required]],
  })

  constructor(private formsBuilder: FormBuilder,
    private route: ActivatedRoute,
    private LibrosStockService: LibrosStockService,
    private LibrosService: LibrosService) { }

  ngOnInit(): void {
    this.mostrarLibro();
  }

  mostrarLibro() {
    this.route.params.subscribe(async param => {
      const id = param['id'];
      this.libro = await this.LibrosService.getLibro(id);
      this.stock = await this.LibrosStockService.getLibroStock(id);

      console.log(this.libro);
      console.log(this.stock);

      this.formulario = this.formsBuilder.group({
        title: this.libro?.title,
        authors: this.libro?.authors,
        edition: this.libro?.edition,
        precio: this.stock?.precio,
        id:this.libro?.id,
        stock: this.stock?.stock,
      })
    })
  }

  editarStock(){
    if(this.formulario.invalid) return console.log("no se puede");

    const libro:LibroStock={
      precio:this.formulario.controls["precio"].value,
      id:this.formulario.controls["id"].value,
      stock:this.formulario.controls["stock"].value,
    }
    this.LibrosStockService.putLibro(libro);
    console.log(libro);
  }
}
