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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
