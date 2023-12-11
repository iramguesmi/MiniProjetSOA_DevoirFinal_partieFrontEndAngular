import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './model/user.model';
import { AuthService } from './auth.service';
import { Image } from './model/image.model';
import { FilmWrapper } from './model/filmWrapper.model';
import { Film } from './model/film.model';
import { Acteur } from './model/acteur.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ActeurService {

  apiURL: string = 'http://localhost:8080/acteurs/api';
  apiURLFilm: string = 'http://localhost:8080/acteurs/film';

  acteurs : Acteur[]=[];
  Acteur!: Acteur;
  films : Film[]=[];
  token!:string;
  constructor( private http : HttpClient,private authService: AuthService) {
  
   }

  

  listeFilms(): Observable<FilmWrapper> {
    let jwt =  this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<FilmWrapper>(this.apiURLFilm,{headers:httpHeaders});
  }

  consulterFilm(id:number): Film {
    return this.films.find(Film => Film.idFilm == id)!;
  }



  listeActeurs(): Observable<Acteur[]> {
    return this.http.get<Acteur[]>(this.apiURL+"/all");
  }

  ajouterActeur(act : Acteur): Observable<Acteur> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
  return this.http.post<Acteur>(this.apiURL+"/addAct", act, {headers:httpHeaders});
  }

  supprimerActeur(id : number) {
  const url= `${this.apiURL}/delAct/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.delete(url, {headers:httpHeaders});
  }

  consulterActeur(id: number): Observable<Acteur> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<Acteur>(url,{headers:httpHeaders});
  }

  updateActeur(act : Acteur) : Observable<Acteur> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.put<Acteur>(this.apiURL+"/updateAct",act,{headers:httpHeaders});
  }

  trierActeur() {
    this.acteurs = this.acteurs.sort((n1,n2) => {
      if(n1.idActeur! > n2.idActeur!) {
        return 1;
      }
      if(n1.idActeur! < n2.idActeur!) {
        return -1;
      }
      return 0;

    });
  }

  rechercherParFilm(idFilm: number): Observable<Acteur[]> {
    const url = `${this.apiURL}/films/${idFilm}`;
    return this.http.get<Acteur[]>(url);
  }

  rechercheParNom(nom: string): Observable<Acteur[]> {
    const url = `${this.apiURL}/actByName/${nom}`;
    return this.http.get<Acteur[]>(url);
  }

  ajouterFilm(film: Film):Observable<Film>  {
    return this.http.post<Film>(this.apiURLFilm,film,httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
    }


    loadImage(id: number): Observable<Image> {
      const url = `${this.apiURL + '/image/get/info'}/${id}`;
      return this.http.get<Image>(url);
      }


      uploadImageAct(file: File, filename: string, idAct:number): Observable<any>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${this.apiURL + '/image/uplaodImageAct'}/${idAct}`;
        return this.http.post(url, imageFormData);
     }
        
     supprimerImage(id : number) {
      const url = `${this.apiURL}/image/delete/${id}`;
      return this.http.delete(url, httpOptions);
      }
      

      uploadImageFS(file: File, filename: string, idAct : number): Observable<any>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${this.apiURL + '/image/uploadFS'}/${idAct}`;
        return this.http.post(url, imageFormData);
      }

      

       loadImageFS(id: number): Observable<Image> {
         const url = `${this.apiURL + '/loadfromFS'}/${id}`;
         return this.http.get<Image>(url);
         }



}
