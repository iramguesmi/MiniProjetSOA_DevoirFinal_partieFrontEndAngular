import { Component } from '@angular/core';
import { Acteur } from '../model/acteur.model';
import { ActeurService } from '../acteur.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent {
  nomActeur! : string;
  acteurs!: Acteur[];
  allActeurs! : Acteur[];
  searchTerm!: string;
  constructor(private acteurService: ActeurService) {}

  ngOnInit(): void {
    this.acteurService.listeActeurs().subscribe(act => {
      this.allActeurs = act;
    });
  }

  rechercheParNom() {
    this.acteurService.rechercheParNom(this.nomActeur).subscribe(act => {
      this.acteurs = act;
    })
  }

  onKeyUp(filterText:string) {
    this.acteurs = this.allActeurs.filter(item => item.nomActeur!.toLowerCase().includes(filterText));
  }
}
