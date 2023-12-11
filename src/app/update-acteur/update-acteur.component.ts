import { Component } from '@angular/core';
import { Acteur } from '../model/acteur.model';
import { Film } from '../model/film.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ActeurService } from '../acteur.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-acteur',
  templateUrl: './update-acteur.component.html',
  styleUrls: ['./update-acteur.component.css']
})
export class UpdateActeurComponent {
  currentActeur = new Acteur();

  films! : Film[];
  updatedFilmId? : number;

  myImage! :string;

  uploadedImage!: File;
  isImageUpdated: Boolean=false;

  constructor(private activatedRoute: ActivatedRoute, private acteurService: ActeurService, private router: Router) {}


  ngOnInit(): void {
    this.acteurService.listeFilms().
    subscribe(films => {this.films = films._embedded.films;
    });
    this.acteurService.consulterActeur(this.activatedRoute.snapshot.params['id'])
    .subscribe( act =>{ this.currentActeur = act;
    this.updatedFilmId = act.film?.idFilm;
    } ) ;
    }

  updateActeur() {

    this.currentActeur.film = this.films.find(film => film.idFilm == this.updatedFilmId)!;
    this.acteurService.updateActeur(this.currentActeur).subscribe(act => {
      this.router.navigate(['acteurs']);
    })
  }

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageActeur(){
    this.acteurService
    .uploadImageAct(this.uploadedImage,this.uploadedImage.name,this.currentActeur.idActeur!)
        .subscribe( (img : Image) => {
              this.currentActeur.images.push(img);
           });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.acteurService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentActeur.images.indexOf(img, 0);
        if (index > -1) {
          this.currentActeur.images.splice(index, 1);
        }
      });
  }

}
