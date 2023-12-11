import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddActeurComponent } from './add-acteur/add-acteur.component';
import { ActeursComponent } from './acteurs/acteurs.component';
import { UpdateActeurComponent } from './update-acteur/update-acteur.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { ListeFilmsComponent } from './liste-films/liste-films.component';
import { RechercheParFilmComponent } from './recherche-par-film/recherche-par-film.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UpdateFilmComponent } from './update-film/update-film.component';
import { TokenInterceptor } from './toke.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddActeurComponent,
    ActeursComponent,
    UpdateActeurComponent,
    ForbiddenComponent,
    LoginComponent,
    ListeFilmsComponent,
    RechercheParFilmComponent,
    RechercheParNomComponent,
    UpdateFilmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
