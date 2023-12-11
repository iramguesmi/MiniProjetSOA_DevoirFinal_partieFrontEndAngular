import { Film } from "./film.model";

export class FilmWrapper {
    _embedded!: {films: Film[]};
}