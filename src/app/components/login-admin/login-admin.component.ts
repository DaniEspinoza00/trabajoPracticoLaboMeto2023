import { AutenticacionService } from './../../services/autenticacion.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admins';
import { Usuario } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit{
  
  listadoAdmins:Admin[]|undefined=[];

  formulario:FormGroup = this.formsBuilder.group({
    usuario:['',[Validators.required]],
    contraseña:['',[Validators.required]]
  })

  constructor(private formsBuilder:FormBuilder,
              private router:Router,
              private AdminService:AdminService,
              private AutenticacionService:AutenticacionService){}

  ngOnInit(): void {
  }

  async login (){
    if(this.formulario.invalid)return;

    this.listadoAdmins=await this.AdminService.getAdmins();
    const resultado = this.listadoAdmins?.find(admin=>admin.usuario===this.formulario.controls['usuario'].value
    && admin.contraseña===this.formulario.controls['contraseña'].value);
    if(resultado){
      alert("Sesion iniciada");
      this.AutenticacionService.currentUser=resultado;
      this.router.navigate(['admin'])
    }else{
      alert ("Usuario o contraseña incorrectos");
    }
  }

  get isUserLoggedIn(): boolean {
    return !!this.AutenticacionService.currentUser;
  }

  
logout() {
  this.AutenticacionService.logout();
  this.router.navigate(['/login-admin']);
}

}
