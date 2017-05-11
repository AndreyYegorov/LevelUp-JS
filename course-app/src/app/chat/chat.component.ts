import { Component, OnInit } from '@angular/core';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { Http, Headers } from '@angular/http';

import { ChatMessage } from '../utils/chat-message';
import { User } from '../utils/user';

import { ChatService } from '../services/chat.service';
import { DateService } from '../services/date.service';
import { ServerService } from '../services/server.service';

import 'rxjs/add/operator/catch';

@Component({
  selector: 'chat',
  providers: [ Location, {provide: LocationStrategy, useClass: HashLocationStrategy} ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  isLogged: Boolean = false;
  imagesToUpload = [];

  location: Location;

  title = 'It\'s our great chat!';
  messages: ChatMessage[];
  userName: string;

  constructor(
    private chatservice: ChatService,
    private dateservice: DateService,
    private serverservice: ServerService,
    location: Location,
    private http: Http
  ) { 
    this.location = location;
  }

  getMessagesAll() {
    this.chatservice.getMessagesAll()
      .subscribe(messages => {
        console.log(messages);

        this.messages = messages;
      });
  }

  filterMessagesByHash(messages, hash) {
    this.chatservice.filterMessagesByHash(messages, hash)
      .subscribe(messages => {
        this.messages = messages;
      });
  }

  addMessage(messageText) {
    let date = this.dateservice.getCurrentDate(),
      userName = this.userName,
      hashes = this.chatservice.getHashes(messageText),
      avatarUrl = `http://api.adorable.io/avatars/50/${userName}@adorable.png`,
      imageUrl = this.imagesToUpload.length ? `./assets/uploads/${this.imagesToUpload[0]['name']}` : '';

    let newMessage = {
      userName,
      messageText,
      hashes,
      date,
      avatarUrl,
      imageUrl
    };

    this.chatservice.addMessage(newMessage)
      .subscribe(message => {
        console.log(message);
        
        this.messages.push(message);
      });
  }

  upload() {
    let formData = new FormData(),
      files = this.imagesToUpload;

      if(files.length) {
        formData.append('image', files[0], files[0]['name']);

        this.chatservice.upload(formData)
          .subscribe(files => {
            console.log('files: ', files);

            this.imagesToUpload = [];
          });
      }
  }

  fileChangeEvent(fileInput) {
    this.imagesToUpload = <Array<File>>fileInput.target.files;
  }

  listenLocation() {
    if(decodeURI(location.hash)) this.filterMessagesByHash(this.messages, decodeURI(location.hash));

    this.location.subscribe((ev) => {
      if(ev.type === 'hashchange') {
        this.filterMessagesByHash(this.messages, decodeURI(location.hash));
      }
    });
  }

  getLoggedUser() {
    this.serverservice.getLoggedUser()
      .then(user => {
        this.isLogged = true;

        this.userName = user.username;
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.serverservice.logout()
      .then(user => {
        this.isLogged = false;
      })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.getLoggedUser();
    this.listenLocation();

    if(!decodeURI(location.hash)) this.getMessagesAll();
  }
}
