import { Component, Output, EventEmitter } from '@angular/core';
import {LoginService} from 'src/app/services/usuario.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output()newCambio=new EventEmitter<boolean>();
  constructor(private loginService:LoginService){}

  cambio(){
    this.newCambio.emit(false)
  }

  async inicioSesion(e:Event){
    e.preventDefault()
    
    let mail : string =(<HTMLInputElement>document.getElementById("mail")).value
    let contra : string =(<HTMLInputElement>document.getElementById("contra")).value

    if(!await this.loginService.inicioSesion(mail,contra)){
      alert ("Correo electronico o contraseña incorrectos")
    }

    
  }
}

