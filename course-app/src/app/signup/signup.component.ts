import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../utils/user';

import { ServerService } from '../services/server.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupError: string;

  user: User = {
      username: '',
      name: '',
      password: ''
  };

  constructor(
    private serverservice: ServerService,
    private router: Router
    ) { }

  signup() {
    this.serverservice.signup(this.user)
      .then(user => {
        console.log(user);

        this.user.username = '';
        this.user.name = '';
        this.user.password = '';

        this.redirectToHome();
      })
      .catch(error => {
        console.log(error);

        this.signupError = 'Signup error. Please, try use another username.';
      });
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  getLoggedUser() {
    this.serverservice.getLoggedUser()
      .then(user => {
        this.redirectToHome();
      })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.getLoggedUser();
  }

}
