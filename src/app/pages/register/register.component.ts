import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/Models/AuthenticationResponse';
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private authService:AuthService,private router : Router) { }

  users!: User[]

  user: User ={
    username: '',
    password: '',
    id: 0,
    firstname: '',
    lastname: '',
    role: Role.USER ||Role.ADMIN

  }

  ngOnInit() {
  }

/*
  onSubmit(): void {
    this.authService.register(this.user).subscribe(response => {
      console.log('Connexion réussie ! Token : ', response.token);
     // window.location.reload();
      //this.authservice.loadProfile(response);
      console.log('token : ', response.token);

    });
  }*/

  onSubmit() {
    this.authService.register(this.user).subscribe((response: AuthenticationResponse) => {
      // Gérer la réponse si nécessaire
      console.log('Registration successful:', response);
      this.router.navigateByUrl("/login")
    }, error => {
      // Gérer les erreurs si nécessaire
      console.error('Registration failed:', error);
    });
  }
  

}
