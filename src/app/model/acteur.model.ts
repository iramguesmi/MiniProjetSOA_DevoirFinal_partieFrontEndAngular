import { Film } from "./film.model";
import { Image } from "./image.model";

export class Acteur {
    idActeur?: number;
    nomActeur?: string;
    telActeur?: string;
    salaireActeur?: number;
    rateActeur?: number;
    film?: Film;

    image! : Image;
    imageStr!:string;
    images!: Image[];
}