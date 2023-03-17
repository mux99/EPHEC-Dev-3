import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserActions } from './pages/userActions/userActions.component';

import { LandingPage } from './pages/landingPage/landingPage.component';
import { ProjectSmall } from './pages/landingPage/projectSmall/projectSmall.component';

import { TimelinePage } from './pages/timelinePage/timelinePage.component';
import { TimelineEvent } from './pages/timelinePage/timelineEvent/timelineEvent.component';

import { SignUpPage } from './pages/signUpPage/signUpPage.component';
import { SignInPage } from './pages/signInPage/signInPage.component';

import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
  { path: 'sign-up', component: SignUpPage },
  { path: 'sign-in', component: SignInPage },
  { path: '', component: LandingPage },
];

@NgModule({
  declarations: [AppComponent,UserActions,LandingPage,ProjectSmall,LandingPage,TimelinePage,TimelineEvent,SignUpPage,SignInPage],
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
export class AppModule { }
