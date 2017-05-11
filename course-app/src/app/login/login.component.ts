import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServerService } from '../services/server.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: string;

  user = {
    username: '',
    password: ''
  };

  constructor(
    private serverservice: ServerService,
    private router: Router
    ) { }

  login() {
    this.serverservice.login(this.user)
      .then(user => {
        console.log(user);

        this.user.username = '';
        this.user.password = '';

        this.redirectToHome();
      })
      .catch(error => {
        console.log(error);

        this.loginError = 'Login error. Please, try use another username or password.';
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
