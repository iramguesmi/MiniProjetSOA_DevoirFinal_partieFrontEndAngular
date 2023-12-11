import { Component } from '@angular/core';
import { Film } from '../model/film.model';
import { Acteur } from '../model/acteur.model';
import { ActeurService } from '../acteur.service';

@Component({
  selector: 'app-recherche-par-film',
  templateUrl: './recherche-par-film.component.html',
  styleUrls: ['./recherche-par-film.component.css']
})
export class RechercheParFilmComponent {
  acteurs! : Acteur[];
  IdFilm! : number;
  films! : Film[];

  constructor(private acteurService: ActeurService) {}

  ngOnInit(): void {
    this.acteurService.listeFilms().subscribe(films => {
      this.films = films._embedded.films;
      console.log(films);
    });
  }
 
  onChange() {
    this.acteurService.rechercherParFilm(this.IdFilm).subscribe(act => {
      this.acteurs = act;
    })
  }
}
