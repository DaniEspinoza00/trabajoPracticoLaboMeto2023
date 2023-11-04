import { Libro } from './../../interfaces/libros';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  libro:Libro|undefined;
  libro2:Libro|undefined;

  constructor(private LibrosService:LibrosService,
              private route:ActivatedRoute){}

  ngOnInit(): void {
    this.mostrarLibro2();
  }

  mostrarLibro2(){
    this.route.params.subscribe(async param=>{
      const id = param ['id'];
      console.log(id);
      this.libro2 = await this.LibrosService.getLibro(id);
      console.log(this.libro2);
    })
  }

}
