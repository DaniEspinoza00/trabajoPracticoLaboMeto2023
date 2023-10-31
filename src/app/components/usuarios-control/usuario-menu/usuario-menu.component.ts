import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-menu',
  templateUrl: './usuario-menu.component.html',
  styleUrls: ['./usuario-menu.component.css']
})
export class UsuarioMenuComponent {
  flag:boolean=false;
  constructor(private loginService : LoginService){}
  
  ngOnInit(){
    this.cambio()
    
  }
  

  cambio(){
    if(this.loginService.usuarioActual.id==0){
      this.flag=true;
    }else{
      this.flag=false;
    }
  }
}
