import { Component } from '@angular/core';
import { Acteur } from '../model/acteur.model';
import { ActeurService } from '../acteur.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-acteurs',
  templateUrl: './acteurs.component.html',
  styleUrls: ['./acteurs.component.css']
})
export class ActeursComponent {
  acteurs : Acteur[] = [];
  apiurl:string='http://localhost:8080/acteurs/api';
  constructor(private acteurService: ActeurService, public authService : AuthService) {
  }
  
  ngOnInit(): void {
    this.chargerActeur();
  }

  chargerActeur(){
    this.acteurService.listeActeurs().subscribe(act => {
    this.acteurs = act;
    this.acteurs.forEach((a) => {
    a.imageStr = 'data:' + a.images[0].type + ';base64,' + 
    a.images[0].image;
    }); 
    });
    }

  supprimerActeur(a: Acteur) {
    let conf = confirm("Etes-vous sur ?");
    if (conf)
      this.acteurService.supprimerActeur(a.idActeur!).subscribe(() => {
        console.log("acteur supprimé");
        this.chargerActeur();
     });
  }

  modifierActeur(a: Acteur) {
    
  }
}
