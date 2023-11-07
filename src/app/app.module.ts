import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarLibrosComponent } from './components/listar-libros/listar-libros.component';
import { MostrarLibroComponent } from './components/mostrar-libro/mostrar-libro.component';
import { ListarLibrosPageComponent } from './pages/listar-libros-page/listar-libros-page.component';
import { MostrarLibroPageComponent } from './pages/mostrar-libro-page/mostrar-libro-page.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaPageComponent } from './pages/categoria-page/categoria-page.component';
import { LoginComponent } from './components/usuarios-control/login/login.component';
import { AccessManagerComponent } from './components/usuarios-control/access-manager/access-manager.component';
import { DataManagerComponent } from './components/usuarios-control/data-manager/data-manager.component';
import { EliminarComponent } from './components/usuarios-control/eliminar/eliminar.component';
import { ModificacionComponent } from './components/usuarios-control/modificacion/modificacion.component';
import { SignupComponent } from './components/usuarios-control/signup/signup.component';
import { UsuarioMenuComponent } from './components/usuarios-control/usuario-menu/usuario-menu.component';
import { UsuarioPageComponent } from './pages/usuario-page/usuario-page.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CompraComponent } from './components/compra/compra.component';
import { CompraPageComponent } from './pages/compra-page/compra-page.component';
import { HttpClientModule } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { AlertaLoginPageComponent } from './pages/alerta-login-page/alerta-login-page.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarLibrosComponent,
    MostrarLibroComponent,
    NavbarComponent,
    ListarLibrosPageComponent,
    MostrarLibroPageComponent,
    FooterComponent,
    HomeComponent,
    HomePageComponent,
    SidebarComponent,
    CategoriaComponent,
    CategoriaPageComponent,
    LoginComponent,
    SignupComponent,
    AccessManagerComponent,
    ModificacionComponent,
    DataManagerComponent,
    EliminarComponent,
    UsuarioMenuComponent,
    UsuarioPageComponent,
    ProductoComponent,
    ProductoPageComponent,
    CarritoPageComponent,
    CarritoComponent,
    CompraComponent,
    CompraPageComponent,
    AlertaLoginPageComponent,
    FavoritosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
