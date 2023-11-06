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

const routes: Routes = [
  {path:'home', component:HomePageComponent},
  {path:'libros', component:ListarLibrosPageComponent},
  {path:'categoria/:genre', component:CategoriaPageComponent},
  {path:'producto/:id', component:ProductoPageComponent},
  {path: 'usuario-menu', component:UsuarioPageComponent},
  {path:'carrito', component:CarritoPageComponent},
  {path:'compra', component:CompraPageComponent},
  {path:'alerta-login', component:AlertaLoginPageComponent},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
