import { LibrosStockService } from 'src/app/services/libro-stock.service';
import { LibrosService } from './../../services/libros.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuarios';
import { Libro } from 'src/app/interfaces/libros';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit{

  constructor (private AdminService:AdminService,
              private LibrosService:LibrosService,
              private LibrosStockService:LibrosStockService,
              private AutenticacionService: AutenticacionService,
              private router:Router){}

  listadoUsuarios:Usuario[]|undefined=[];
  listadoLibros:Libro[]|undefined=[];
  listadoStock:LibroStock[]|undefined=[];

  ngOnInit(): void {
    this.mostrarUsuarios();
    this.mostrarLibros();
    this.mostrarStock();
  }

  async mostrarUsuarios(){
    this.listadoUsuarios=await this.AdminService.getUsuarios();
  }

  eliminarCliente(id:number){
    const ok = confirm("Desea eliminar el cliente?")
    if(!ok) return ;
    this.AdminService.deleteUsuario(id) //llamo al servicio
  }

  async mostrarLibros(){
    this.listadoLibros=await this.LibrosService.getLibros();
  }

  async mostrarStock(){
    this.listadoStock=await this.LibrosStockService.getStock();
  }

  get isUserLoggedIn(): boolean {
    return this.AutenticacionService.isUserLoggedIn;
  }

  logout() {
    this.AutenticacionService.logout();
    alert("Se ha cerrado sesion");
    this.router.navigate(['/login-admin']);
  }

    /////////////////////////////////////////

    logout2() {
      this.AutenticacionService.logout2();
      alert("Se ha cerrado sesion");
      this.router.navigate(['/login-admin']);
    }

}
