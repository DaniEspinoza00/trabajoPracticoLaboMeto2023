import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  flag: boolean=false
  constructor (private loginService: LoginService){}

  ngOnInit(){
    if (this.loginService.usuarioActual.id!=0){
      this.flag=true
    }
  }
}
