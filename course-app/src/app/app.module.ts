import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { ChatService } from './services/chat.service';
import { DateService } from './services/date.service';
import { ServerService } from './services/server.service';

import { FilterPipe } from './pipes/filter.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { TransformMessage } from './pipes/transformMessage.pipe';

const appRoutes: Routes = [
  {
    path: '', component: ChatComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    SignupComponent,
    LoginComponent,
    FilterPipe,
    HighlightPipe,
    TransformMessage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ChatService,
    DateService,
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
