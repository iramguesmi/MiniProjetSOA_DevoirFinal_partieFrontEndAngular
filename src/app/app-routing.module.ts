import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActeursComponent } from './acteurs/acteurs.component';
import { AddActeurComponent } from './add-acteur/add-acteur.component';
import { UpdateActeurComponent } from './update-acteur/update-acteur.component';
import { RechercheParFilmComponent } from './recherche-par-film/recherche-par-film.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { LoginComponent } from './login/login.component';
import { ListeFilmsComponent } from './liste-films/liste-films.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { acteurGuard } from './acteur.guard';

const routes: Routes = [
  {path: "acteurs", component: ActeursComponent},
  {path: "add-acteur", component: AddActeurComponent, canActivate:[acteurGuard]},
  {path: "", redirectTo: "acteurs", pathMatch: "full" },
  {path: "updateActeur/:id", component: UpdateActeurComponent},
  {path: "rechercheParFilm", component : RechercheParFilmComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeFilms", component: ListeFilmsComponent},
  {path: "login", component: LoginComponent},
  {path: "app-forbidden", component:ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
