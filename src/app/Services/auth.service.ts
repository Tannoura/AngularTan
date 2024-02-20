import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../Models/User';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../Models/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  

  constructor(private http:HttpClient,private router : Router) { }

  private baseUrl ="http://localhost:8083/hrmaps"

  isAuthenticated : boolean=false;
  username:any;
  accessToken!:any;


  register(user: User): Observable<AuthenticationResponse> {
    
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register`, user);
  }

login(user: User): Observable<AuthenticationResponse> {
  let options = {
    headers: new HttpHeaders().set("Content-Type", "application/json")
  }

  return this.http.post<AuthenticationResponse>(`${this.baseUrl}/login`, user, options);
}


  loadProfile(data : object){
    this.isAuthenticated=true ; 
      this.accessToken = data['token'];

    let decodedJwt:any =  jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;

    window.localStorage.setItem("token",this.accessToken);
  }

     logout() {
this.isAuthenticated=false;
this.accessToken=undefined;
this.username=undefined;
window.localStorage.removeItem("token")
window.location.reload();

//this.router.navigateByUrl("/login");


  }
  

      loadJwtTokenFromLocalStorage() {
      let token = window.localStorage.getItem("token");

        if(token){
        this.loadProfile({"token":token});
          this.router.navigateByUrl("/icons")
        }

  }

}
