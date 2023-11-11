import { Tarjeta } from './../interfaces/tarjeta';
import { Injectable, inject } from '@angular/core';
import { Usuario } from '../interfaces/usuarios';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "http://localhost:2000/usuarios"
  listaUsuarios: Usuario[] | undefined = [];
  usuarioLogueado: Usuario | undefined;
  tarjeta: Tarjeta = {
    numeroTarjeta: 0,
    codigoSeguridad: 0,
    nombreTarjeta: '',
    dni: 0,
    fechaCaducidad: ''
  }
  //usuarioVacio:Usuario = {id:10,nombre:'',apellido:'1',mail:'1',contra:'1',documento:'0',tarjetaCredito:false,favoritos:[1,2,3]}
  usuarioVacio: Usuario = { id: 0, nombre: '', apellido: '', mail: '', contra: '', documento: '0', tarjetaCredito: this.tarjeta, favoritos: [] }
  usuarioActual: Usuario = this.usuarioVacio

  constructor(private router: Router) { }


  getUsuarioActual(): Usuario {
    return this.usuarioActual
  }

  setUsuarioActual(user: Usuario) {
    this.usuarioActual = user;
  }

  async leerJson() {
    try {
      const respuesta = await fetch(this.url)
      const usuarios = await respuesta.json()
      if (usuarios) {
        console.log(usuarios)
        this.listaUsuarios = JSON.parse(JSON.stringify(usuarios))
        if (this.listaUsuarios) {
          this.listaUsuarios.sort(function (a, b) { return a.id - b.id })
        }
      } else {
        console.log("No se pudo acceder a los usuarios")
      }
    } catch (error) {
      console.log(error)
    }
  }

  async leerUsuario(id: number): Promise<Usuario | undefined> {

    try {
      const respuesta = await fetch(this.url + "/" + id,
        {
          method: 'GET'
        })

      const rta = await respuesta.json()
      const user: Usuario = JSON.parse(JSON.stringify(rta))
      console.log(user)
      return user
    } catch (error) {
      console.log(error)

    }
    return undefined
  }

  async escribirJson(nuevo: Usuario) {
    try {
      await fetch(this.url,
        {
          method: 'POST',
          body: JSON.stringify(nuevo),
          headers: { 'Content-type': 'application/json' }
        })
      this.router.navigate(['home'])
    } catch (error) {
      console.log(error)
    }
  }

  async modifJson(cambio: Usuario) {
    try {
      await fetch(this.url + "/" + cambio.id,
        {
          method: 'PUT',
          body: JSON.stringify(cambio),
          headers: { 'Content-type': 'application/json' }
        })
      this.usuarioActual = cambio;
      console.log(this.usuarioActual)
      //
    } catch (error) {
      console.log(error)
    }
  }

  modifUsuario(cambio: Usuario) {
    this.modifJson(cambio)
    this.router.navigate(['home'])
  }

  agregarUsuarioLista(nuevo: Usuario) {
    if (this.listaUsuarios) {
      this.listaUsuarios.push(nuevo)
      this.listaUsuarios.sort(function (a, b) { return a.id - b.id })
      this.escribirJson(nuevo);
    }
  }

  idDisponible() {
    var disp: number = 0;
    if (this.listaUsuarios) {
      disp++
      var flag: boolean = true;


      for (var i: number = 0; i < this.listaUsuarios.length && flag; i++) {
        if (disp == this.listaUsuarios[i].id) {
          disp++;
        } else {
          flag = false;
        }
      }
    }
    return disp;

  }

  asignarId(user: Usuario) {
    user.id = this.idDisponible();
  }

  async borrarUsuarioActual() {
    try {
      await fetch(this.url + "/" + this.usuarioActual.id,
        {
          method: 'DELETE',
          headers: { 'Content-type': 'application/json' }
        })
      this.usuarioActual = this.usuarioVacio
      this.router.navigate(['home'])
    } catch (error) {
      console.log(error)
    }
  }

  async inicioSesion(mail: string, contra: string) {

    var flag: boolean = false
    if (this.listaUsuarios) {
      for (var i: number = 0; i < this.listaUsuarios.length && !flag; i++) {
        if (this.listaUsuarios[i].mail == mail && this.listaUsuarios[i].contra == contra) {
          this.usuarioLogueado = await this.leerUsuario(this.listaUsuarios[i].id)
          if (this.usuarioLogueado) {
            this.usuarioActual = this.usuarioLogueado
            flag = true;
            this.router.navigate(['home'])

          } else {
            console.log(("Hubo error"))
          }

        }
      }
    }
    return flag
  }

  verificarMail(user: Usuario) {
    var flag: boolean = false;
    if (this.listaUsuarios) {
      for (var i: number = 0; i < this.listaUsuarios.length && !flag; i++) {
        if (user.mail == this.listaUsuarios[i].mail) {
          flag = true
        }
      }
    }
    return flag
  }

  modifFav(id: number): boolean {

    if (this.usuarioActual.favoritos.indexOf(id) > -1) {
      this.eliminarFav(id)
      return false
    } else {
      this.usuarioActual.favoritos.push(id)
      this.modifJson(this.usuarioActual)
      return true
    }
  }

  eliminarFav(id: number) {
    this.usuarioActual.favoritos.splice(this.usuarioActual.favoritos.indexOf(id), 1)
    this.modifJson(this.usuarioActual)
  }

  async putTarjeta(usuario: Usuario | null){
    try {
      await fetch(`${this.url}/${usuario?.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(usuario),
          headers: { 'Content-type': 'application/json' }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

}
