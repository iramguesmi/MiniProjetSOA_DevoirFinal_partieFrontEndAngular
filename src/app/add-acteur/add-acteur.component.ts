import { Component } from '@angular/core';
import { Film } from '../model/film.model';
import { Acteur } from '../model/acteur.model';
import { ActeurService } from '../acteur.service';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-acteur',
  templateUrl: './add-acteur.component.html',
  styleUrls: ['./add-acteur.component.css']
})
export class AddActeurComponent {
  newActeur = new Acteur();
  films! : Film[];
  newIdFilm! : number;
  newFilm! : Film;

  uploadedImage!: File;
  imagePath: any;

  constructor(private acteurService: ActeurService, private router: Router) { }
  ngOnInit(): void {
    
    this.acteurService.listeFilms().subscribe(films => {
      this.films = films._embedded.films;
    })
  }


  addActeur() {
    
    this.acteurService.ajouterActeur(this.newActeur)
      .subscribe((addedActeur: Acteur) => {
        
        this.acteurService.uploadImageAct(this.uploadedImage, this.uploadedImage.name , addedActeur.idActeur!)
          .subscribe((img: Image) => {
            
            addedActeur.film = this.films.find(cat => cat.idFilm == this.newIdFilm)!;
            img.idAct = addedActeur.idActeur!;
            console.log(addedActeur.idActeur)
            console.log(img.idAct); 
            addedActeur.image = img;
  
            
            this.acteurService.updateActeur(addedActeur)
              .subscribe(() => {
                this.router.navigate(['acteurs']);
              });
          });
      });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }

}
