import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserActions } from './components/userActions/userActions.component';

import { LandingPage } from './pages/landingPage/landingPage.component';
import { ProjectSmall } from './pages/landingPage/projectSmall/projectSmall.component';

import { TimelinePage } from './pages/timelinePage/timelinePage.component';
import { TimelineEvent } from './pages/timelinePage/timelineEvent/timelineEvent.component';

import { SignUpPage } from './pages/signUpPage/signUpPage.component';
import { SignInPage } from './pages/signInPage/signInPage.component';

import { ProjectPage } from './pages/projectPage/projectPage.component';
import { ProjectEvent } from './pages/projectPage/projectEvent/projectEvent.component';

import { CookiePopup } from './components/cookiePopup/cookiePopup.component'

import { CookieService } from 'ngx-cookie-service';
import { projectTimelines } from './pages/projectPage/projectTimelines/projectTimelines.component';

const appRoutes: Routes = [
  { path: 'sign-up', component: SignUpPage },
  { path: 'sign-in', component: SignInPage },
  { path: '', component: LandingPage },
  { path: 'project', component: ProjectPage }
];

export function setCookie(name: string, value: string, expireDays: number, path: string = '') {
  let d:Date = new Date();
  d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  let expires:string = `expires=${d.toUTCString()}`;
  let cpath:string = path ? `; path=${path}` : '';
  document.cookie = `${name}=${value}; ${expires}${cpath}`;
}

export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

@NgModule({
  declarations: [AppComponent,UserActions,LandingPage,ProjectSmall,LandingPage,TimelinePage,TimelineEvent,SignUpPage,SignInPage,ProjectPage,ProjectEvent, projectTimelines, CookiePopup],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})

export class AppModule {}
