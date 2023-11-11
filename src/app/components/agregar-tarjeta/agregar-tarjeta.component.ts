import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { Usuario } from 'src/app/interfaces/usuarios';
import { LoginService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.css']
})
export class AgregarTarjetaComponent implements OnInit{

  user: Usuario | undefined
  
  formulario: FormGroup = this.formBuilder.group({
    numeroTarjeta: [0, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    codigoSeguridad:[0, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    nombreTarjeta:['', Validators.required],
    dni:[0, Validators.required],
    fechaCaducidad:['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private LoginService:LoginService, private router:Router){
    
  }

  ngOnInit(): void {
    this.user = this.LoginService.getUsuarioActual()
  }


  async guardarTarjeta(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched()
      return;
    }
    let tarjeta: Tarjeta = {
      numeroTarjeta: this.formulario.controls['numeroTarjeta'].value,
      codigoSeguridad: this.formulario.controls['codigoSeguridad'].value,
      nombreTarjeta: this.formulario.controls['nombreTarjeta'].value,
      dni: this.formulario.controls['dni'].value,
      fechaCaducidad: this.formulario.controls['fechaCaducidad'].value
    }

    this.user!.tarjetaCredito = tarjeta
    await this.LoginService.putTarjeta(this.user!);
    this.router.navigate(['compra'])
  }

  validar(field: string, error: string){
    return this.formulario.controls[field].getError(error)
    &&
    this.formulario.controls[field].touched
  }
}
