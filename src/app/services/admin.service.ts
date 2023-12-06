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

  async getUsuarios():Promise < Usuario[]| undefined>{
    try{                                              
      const resultado = await fetch (this.url,{method:'GET'})
      const usuario = resultado.json();
      return usuario;
    }catch(error){
      console.log(error);
    }
    return undefined;
  }

  async getUsuario (id:number): Promise <Usuario|undefined>{
    try {
      const resultado = await fetch(`${this.url}/${id}`);
      const usuario = await resultado.json();
      return usuario;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async putUsuario (Usuario:Usuario|null){
    try {
      await fetch(`${this.url}/${Usuario?.id}`, {method:'PUT',
      body: JSON.stringify(Usuario),
      headers:{'Content-type': 'application/json'}})
      this.router.navigate (['admin'])
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUsuario(id:number){
    try {
      await fetch(`${this.url}/${id}`,{method:'DELETE'})
      this.router.navigate(['admin'])
    } catch (error) {
      console.log(error);
    }
  }



  async getAdmins():Promise <Admin[]| undefined>{
    try{                                              
      const resultado = await fetch (this.url2,{method:'GET'})
      const admins = resultado.json();
      return admins;
    }catch(error){
      console.log(error);
    }
    return undefined;
  }


  ////////////////////////

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
