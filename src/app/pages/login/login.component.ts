import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User ={
    username: '',
    password: '',
    id: 0,
    firstname: '',
    lastname: '',
    role: Role.USER ||Role.ADMIN

  }
constructor(private authservice : AuthService , private router : Router){}

  ngOnInit(): void {
   
  }

/*
  handleLogin() {
    console.log(this.user)
  this.authservice.login(this.user).subscribe({
next: data=>{
console.log(data)
this.authservice.loadProfile(data);
this.router.navigateByUrl("/icons");

},
error :err => {
  console.log(err)
}

  });
  
  }*/

  login(): void {
    this.authservice.login(this.user).subscribe(response => {
      console.log('Connexion réussie ! Token : ', response.token);
      localStorage.setItem('token', response.token);
      window.location.reload();
      this.router.navigateByUrl("/icons")
      //this.authservice.loadProfile(response);
      //console.log('Nom d\'utilisateur extrait : ', this.authservice.username);

    });
  }
  
}
