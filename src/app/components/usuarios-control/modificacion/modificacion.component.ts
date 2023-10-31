import { Component, Output, EventEmitter } from '@angular/core';
import {LoginService} from 'src/app/services/usuario.service'
import { Usuario } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-modificacion',
  templateUrl: './modificacion.component.html',
  styleUrls: ['./modificacion.component.css']
})

export class ModificacionComponent {
  @Output()newOpcion=new EventEmitter<number>();
  constructor(private loginService:LoginService){}

  opcion(valor: number){
    
    this.loginService.leerJson()
    this.newOpcion.emit(valor)
  }

   
  modificar(e:Event){
    e.preventDefault()

    let actual : Usuario=this.loginService.getUsuarioActual()

    let nombre : string =(<HTMLInputElement>document.getElementById("nombre")).value
    let apellido : string =(<HTMLInputElement>document.getElementById("apellido")).value
    let mail : string =(<HTMLInputElement>document.getElementById("mail")).value
    let contra : string =(<HTMLInputElement>document.getElementById("contra")).value

    if(nombre!=""){
    actual.nombre=nombre
    }

    if(apellido!=""){
      actual.apellido=apellido
      }

    if(mail!=""){
      actual.mail=mail
      }
    
    if(contra!=""){
        actual.contra=contra
      }

    this.loginService.modifJson(actual)
  }



}
