import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { UserActions } from './components/userActions/userActions.component';
import { CookiePopup } from './components/cookiePopup/cookiePopup.component';
import { EditButton } from './components/editButton/editButton.component';
import { PasswordPopup } from './components/passwordPopup/passwordPopup.component';

import { SignUpPage } from './pages/signUpPage/signUpPage.component';
import { SignInPage } from './pages/signInPage/signInPage.component';

import { ProjectPage } from './pages/projectPage/projectPage.component';
import { ProjectEvent } from './pages/projectPage/projectEvent/projectEvent.component';
import { ProjectTimeline } from './pages/projectPage/projectTimeline/projectTimeline.component';
import { TimelineAdd } from './pages/projectPage/timelineAdd/timelineAdd.component';

import { LandingPage } from './pages/landingPage/landingPage.component';
import { ProjectSmall } from './pages/landingPage/projectSmall/projectSmall.component';
import { ProjectAdd } from './pages/landingPage/projectAdd/projectAdd.component';
import { ProjectImport } from './pages/landingPage/projectImport/projectImport.component'

import { ProfilePage } from './pages/profilePage/profilePage.component';

import { TimelinePage } from './pages/timelinePage/timelinePage.component';
import { TimelineEvent } from './pages/timelinePage/timelineEvent/timelineEvent.component';

const appRoutes: Routes = [
  { path: 'sign-up', component: SignUpPage},
  { path: 'sign-in', component: SignInPage},
  { path: '', component: LandingPage},
  { path: 'p/:id', component: ProjectPage},
  {path: 'p/:id/:data', component: ProjectPage},
  { path: 'p/:pid/t/:tid', component: TimelinePage},
  { path: 'profile', component: ProfilePage}
];

@NgModule({
  declarations: [AppComponent,UserActions,LandingPage,ProjectSmall,LandingPage,TimelinePage,TimelineEvent,SignUpPage,
    SignInPage,ProjectPage,ProjectEvent,ProjectTimeline,CookiePopup,EditButton,ProjectAdd,TimelineAdd,ProfilePage,
    PasswordPopup,ProjectImport],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})

export class AppModule {}
