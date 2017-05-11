import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { ChatMessage } from '../utils/chat-message';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

  constructor(private http: Http) { }

  getHashes(message) {
    let hashMatches = message.match(/(^|\s)#[\wа-я]+/g);

    if(!hashMatches) return [];

    return hashMatches.map((el, index) => {
      if(message.charAt(0) === '#' && index === 0) return el;

      return el.slice(1);
    });
  }

  filterMessagesByHash(messages, hash) {
    return this.getMessagesAll()
      .map(res => {
        if(!hash){
          return messages = res
        }
        else {
          return messages = res.filter(el => el.hashes.find(elhash => elhash === hash));
        }
      });
  }

  getMessagesAll() {
    return this.http.get('http://localhost:3000/api/messages')
      .map(res => res.json())
      .catch(this.handleError);
  }

  addMessage(newMessage) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    console.log(newMessage);

    return this.http.post('http://localhost:3000/api/message', newMessage, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  upload(formData) {
    return this.http.post('http://localhost:3000/api/upload', formData)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    return Observable.throw(error.message || error);
  }
}
