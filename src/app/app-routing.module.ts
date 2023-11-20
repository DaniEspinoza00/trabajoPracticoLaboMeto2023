import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarLibrosPageComponent } from './pages/listar-libros-page/listar-libros-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoriaPageComponent } from './pages/categoria-page/categoria-page.component';
import { UsuarioPageComponent } from './pages/usuario-page/usuario-page.component';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { CompraPageComponent } from './pages/compra-page/compra-page.component';
import { AlertaLoginPageComponent } from './pages/alerta-login-page/alerta-login-page.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { AgregarTarjetaPageComponent } from './pages/agregar-tarjeta-page/agregar-tarjeta-page.component';
import { AgradecimientoPageComponent } from './pages/agradecimiento-page/agradecimiento-page.component';
import { FavoritoPageComponent } from './pages/favorito-page/favorito-page.component';
import { AdministracionPageComponent } from './pages/administracion-page/administracion-page.component';
import { MostrarLibroPageComponent } from './pages/mostrar-libro-page/mostrar-libro-page.component';
import { MostrarUsuariosPageComponent } from './pages/mostrar-usuarios-page/mostrar-usuarios-page.component';
import { LoginAdminPageComponent } from './pages/login-admin-page/login-admin-page.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AutoresPageComponent } from './pages/autores-page/autores-page.component';
import { BusquedaPageComponent } from './pages/busqueda-page/busqueda-page.component';
import { EnConstruccionPageComponent } from './pages/en-construccion-page/en-construccion-page.component';
import { ContactoPageComponent } from './pages/contacto-page/contacto-page.component';

const routes: Routes = [
  {path:'home', component:HomePageComponent},
  {path:'libros', component:ListarLibrosPageComponent},
  {path:'categoria/:genre', component:CategoriaPageComponent},
  {path:'producto/:id', component:ProductoPageComponent},
  {path: 'usuario-menu', component:UsuarioPageComponent},
  {path:'carrito', component:CarritoPageComponent},
  {path:'compra', component:CompraPageComponent},
  {path:'alerta-login', component:AlertaLoginPageComponent},
  {path: 'lista-favoritos', component: FavoritoPageComponent},
  {path: 'admin',component:AdministracionPageComponent},
  {path: 'libro/:id', component:MostrarLibroPageComponent},
  {path: 'usuario/:id', component:MostrarUsuariosPageComponent},
  {path: 'login-admin', component:LoginAdminPageComponent},
  {path:'agregar-tarjeta', component:AgregarTarjetaPageComponent},
  {path:'felicidades', component:AgradecimientoPageComponent},
  {path:'historial',component: HistorialComponent},
  {path:'autores/:authors', component: AutoresPageComponent},
  {path: 'busqueda/:search', component: BusquedaPageComponent},
  {path: 'en-construccion', component: EnConstruccionPageComponent},
  {path: 'contacto', component: ContactoPageComponent},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
