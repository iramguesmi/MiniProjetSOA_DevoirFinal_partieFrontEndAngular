import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '../model/film.model';

@Component({
  selector: 'app-update-film',
  templateUrl: './update-film.component.html',
  styleUrls: ['./update-film.component.css']
})
export class UpdateFilmComponent {
@Input()
film! : Film;

@Input()
ajout!:boolean;

@Output()
filmUpdated = new EventEmitter<Film>();



ngOnInit(): void {
}

saveFilm() {
  this.filmUpdated.emit(this.film);
}
}
