import { Component, Output, EventEmitter,inject } from '@angular/core';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { Usuario } from 'src/app/interfaces/usuarios';
import {LoginService} from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Output()newCambio=new EventEmitter<boolean>();
  
  formulario:FormGroup = this.formsBuilder.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    mail:['',[Validators.required]],
    contra:['',[Validators.required]],
    dni:['',[Validators.required]],
  })
  

  tarjeta: Tarjeta = {
    numeroTarjeta: 0,
    codigoSeguridad: 0,
    nombreTarjeta: '',
    dni: 0,
    fechaCaducidad: ''
  }
  constructor(private loginService:LoginService,private formsBuilder:FormBuilder){}


  cambio(){
    this.newCambio.emit(true)
  }

  registrar(e:Event){
    if(this.formulario.invalid)return;
    e.preventDefault();
    

    let nombre : string =(<HTMLInputElement>document.getElementById("nombre")).value
    let apellido : string =(<HTMLInputElement>document.getElementById("apellido")).value
    let mail : string =(<HTMLInputElement>document.getElementById("mail")).value
    let contra : string =(<HTMLInputElement>document.getElementById("contra")).value
    let dni : string =(<HTMLInputElement>document.getElementById("dni")).value

    let nuevo : Usuario=  {id:this.loginService.idDisponible(), nombre:nombre,apellido:apellido,mail:mail,contra:contra,documento:dni,tarjetaCredito:this.tarjeta,favoritos:[],historial:[]}
    if(this.loginService.verificarMail(nuevo)){
      alert ("Ya existe una cuenta registrada con este correo electronico")
    }else{
      this.loginService.agregarUsuarioLista(nuevo);
    }
    this.loginService.usuarioActual=nuevo
  }
}
