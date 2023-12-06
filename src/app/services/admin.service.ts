import { Usuario } from './../interfaces/usuarios';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../interfaces/admins';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url:string="http://localhost:2000/usuarios";
  url2:string="http://localhost:4000/admin";

  constructor(private router:Router, private http: HttpClient) { }

  getUsuariosHttp(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  getUsuarioHttp(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }

  putUsuarioHttp(Usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.url}/${Usuario.id}`,
      Usuario,
      {headers: { 'Content-type': 'application/json' }}
    )
  }

  deleteUsuarioHttp(id: number):Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.url}/${id}`);
  }

  getAdminsHttp():Observable<Admin[]>{
    return this.http.get<Admin[]>(this.url2);
  }
}
