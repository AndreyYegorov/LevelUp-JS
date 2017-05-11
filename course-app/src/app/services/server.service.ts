import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from "@angular/router";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServerService {

  constructor(private http: Http) { 
  }

  signup(user) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    console.log(user);

    return this.http.post('http://localhost:3000/api/signup', user, {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    console.log(user);

    return this.http.post('http://localhost:3000/api/login', user, {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  logout() {
    return this.http.get('http://localhost:3000/api/logout')
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  getLoggedUser() {
    return this.http.get('http://localhost:3000/api/user')
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
