import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuarios';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.component.html',
  styleUrls: ['./mostrar-usuarios.component.css']
})
export class MostrarUsuariosComponent implements OnInit{
  
  usuario:Usuario|undefined;

  formulario:FormGroup = this.formsBuilder.group({
    id:[0,[Validators.required]],
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    mail:['',[Validators.required]],
    contra:['',[Validators.required]],
    documento:['',[Validators.required]],
    tarjetaCredito:[false,[Validators.required]],
    /* favoritos:[[0],[Validators.required]], */
  })

  constructor (private formsBuilder: FormBuilder,
    private route: ActivatedRoute,
    private AdminService:AdminService){}
  
  ngOnInit(): void {
    this.mostrarCliente()
  }

  mostrarCliente(){
    this.route.params.subscribe(async param =>{
      const id = param['id'];
      this.usuario=await this.AdminService.getUsuario(id);
      
      this.formulario = this.formsBuilder.group({
        id: this.usuario?.id,
        nombre: this.usuario?.nombre,
        apellido: this.usuario?.apellido,
        mail: this.usuario?.mail,
        contra:this.usuario?.contra,
        documento:this.usuario?.documento,
        tarjetaCredito:this.usuario?.tarjetaCredito,
        favoritos:this.usuario?.favoritos,
      })
    })
  }

  editarUsuario(){
    if(this.formulario.invalid) return console.log("no se puede");

    const usuario:Usuario={
        id:this.formulario.controls["id"].value,
        nombre: this.formulario.controls["nombre"].value,
        apellido: this.formulario.controls["apellido"].value,
        mail: this.formulario.controls["mail"].value,
        contra:this.formulario.controls["contra"].value,
        documento:this.formulario.controls["documento"].value,
        tarjetaCredito:this.formulario.controls["tarjetaCredito"].value,
        favoritos:[],
        historial:[]
      }
      if(this.usuario?.favoritos){
        usuario.favoritos=this.usuario.favoritos
      }
      if(this.usuario?.historial){
        usuario.historial=this.usuario.historial
      }
      this.AdminService.putUsuario(usuario);
      console.log(usuario);
  }
}
