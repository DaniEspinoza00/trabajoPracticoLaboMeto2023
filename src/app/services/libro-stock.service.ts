import { Injectable } from '@angular/core';
import { LibroStock } from '../interfaces/libroStock';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosStockService {

  urlStock:string = "http://localhost:3000/librosStock";
  ListadoStock:LibroStock [] |undefined=[];

  constructor(private router:Router, private http:HttpClient) { }


  async getLibroStock(id:number): Promise<LibroStock | undefined>{ //este lo usa
    try {
      const resultado = await fetch(`${this.urlStock}/${id}`);
      const libro = await resultado.json();
      return libro;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }



  async putStock(stock: LibroStock | null){ //este se usa
    try {
      await fetch(`${this.urlStock}/${stock?.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(stock),
          headers: { 'Content-type': 'application/json' }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  getStockHttp():Observable<LibroStock[]>{
    return this.http.get<LibroStock[]>(this.urlStock)
  }

  getLibroStockHttp(id:number): Observable<LibroStock>{
    return this.http.get<LibroStock>(`${this.urlStock}/${id}`)
  }

  putLibroHttp(libro:LibroStock):Observable<LibroStock>{
    return this.http.put<LibroStock>(
      `${this.urlStock}/${libro.id}`,
      libro,
      {headers: {'Content-type': 'application/json'}}
    )
  }
}

