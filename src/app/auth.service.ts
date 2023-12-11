import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUser?: string;
  public isLoggedIn: Boolean = false;
  public roles? : string[];

  apiURL: string = 'http://localhost:8081/users'; 
  token!:string;

  private helper = new JwtHelperService();
  constructor(private router: Router,private http: HttpClient) { }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
    }

  setLogegdUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isLoggedIn = true;
    //this.getUserRoles(login);
  }


  login(user : User) {
    return this.http.post<User>(this.apiURL+'/login',user, {observe:'response'});
  }

  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isLoggedIn = true; 
    this.decodeJWT();

}

decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  getToken() {
    return this.token;
  }

  isTokenExpired(): Boolean
  {
    return  this.helper.isTokenExpired(this.token);   
  }

  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
    return false;
    return (this.roles.indexOf('ADMIN') >-1) ;
    ;
  } 
  

}
