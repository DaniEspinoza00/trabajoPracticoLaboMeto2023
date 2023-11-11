import { Component, Output, EventEmitter,inject } from '@angular/core';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { Usuario } from 'src/app/interfaces/usuarios';
import {LoginService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Output()newCambio=new EventEmitter<boolean>();
  tarjeta: Tarjeta = {
    numeroTarjeta: 0,
    codigoSeguridad: 0,
    nombreTarjeta: '',
    dni: 0,
    fechaCaducidad: ''
  }
  constructor(private loginService:LoginService){}


  cambio(){
    this.newCambio.emit(true)
  }

  registrar(e:Event){
    e.preventDefault();
    

    let nombre : string =(<HTMLInputElement>document.getElementById("nombre")).value
    let apellido : string =(<HTMLInputElement>document.getElementById("apellido")).value
    let mail : string =(<HTMLInputElement>document.getElementById("mail")).value
    let contra : string =(<HTMLInputElement>document.getElementById("contra")).value
    let dni : string =(<HTMLInputElement>document.getElementById("dni")).value

    let nuevo : Usuario=  {id:this.loginService.idDisponible(), nombre:nombre,apellido:apellido,mail:mail,contra:contra,documento:dni,tarjetaCredito:this.tarjeta,favoritos:[]}
    if(this.loginService.verificarMail(nuevo)){
      alert ("Ya existe una cuenta registrada con este correo electronico")
    }else{
      this.loginService.agregarUsuarioLista(nuevo);
    }
    this.loginService.usuarioActual=nuevo
  }
}
