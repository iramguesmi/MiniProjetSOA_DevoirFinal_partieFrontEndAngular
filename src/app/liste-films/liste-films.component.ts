import { Component } from '@angular/core';
import { Film } from '../model/film.model';
import { ActeurService } from '../acteur.service';

@Component({
  selector: 'app-liste-films',
  templateUrl: './liste-films.component.html',
  styleUrls: ['./liste-films.component.css']
})
export class ListeFilmsComponent {
  ajout:boolean=true;

  films! : Film[];
  updatedFilm: Film = {"idFilm":0,"nomFilm":""};
  constructor(private acteurService: ActeurService) {}

  ngOnInit(): void {
  
    this.chargerFilms()
  }

  filmUpdated(film: Film) {
    console.log("Film updated event",film);
    this.acteurService.ajouterFilm(film).
    subscribe( ()=> this.chargerFilms());
  }

  chargerFilms() {
    this.acteurService.listeFilms().
    subscribe(films => {this.films = films._embedded.films;
    console.log(films);
  });
  }

  updateFilm(film: Film) {
    this.updatedFilm = film;
    this.ajout=false;
  }

}
