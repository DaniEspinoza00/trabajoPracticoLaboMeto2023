import { Component, Output, EventEmitter,inject } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuarios';
import {LoginService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Output()newCambio=new EventEmitter<boolean>();
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

    let nuevo : Usuario=  {id:this.loginService.idDisponible(), nombre:nombre,apellido:apellido,mail:mail,contra:contra,documento:0,tarjetaCredito:false,favoritos:[]}
    if(this.loginService.verificarMail(nuevo)){
      alert ("Ya existe una cuenta registrada con este correo electronico")
    }else{
      this.loginService.agregarUsuarioLista(nuevo);
    }
    this.loginService.usuarioActual=nuevo
  }
}
