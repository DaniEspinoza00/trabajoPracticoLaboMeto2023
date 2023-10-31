import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarLibrosPageComponent } from './pages/listar-libros-page/listar-libros-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoriaPageComponent } from './pages/categoria-page/categoria-page.component';
import { UsuarioPageComponent } from './pages/usuario-page/usuario-page.component';

const routes: Routes = [
  {path:'home', component:HomePageComponent},
  {path:'libros', component:ListarLibrosPageComponent},
  {path:'categoria/:genre', component:CategoriaPageComponent},
  {path: 'usuario-menu', component:UsuarioPageComponent},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
