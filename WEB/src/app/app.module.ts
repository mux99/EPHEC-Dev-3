import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//import { MarkdownModule } from 'ngx-markdown';

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
import { ProjectTimeline } from './pages/projectPage/projectTimeline/projectTimeline.component';

import { CookiePopup } from './components/cookiePopup/cookiePopup.component';
import { SearchBar } from './components/searchBar/searchBar.component';
import { EditButton } from './components/editButton/editButton.component';

//import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
  { path: 'sign-up', component: SignUpPage},
  { path: 'sign-in', component: SignInPage},
  { path: '', component: LandingPage},
  { path: 'p/:id', component: ProjectPage},
  { path: 't/:id', component: TimelinePage}
];

@NgModule({
  declarations: [AppComponent,UserActions,LandingPage,ProjectSmall,LandingPage,TimelinePage,TimelineEvent,SignUpPage,SignInPage,ProjectPage,ProjectEvent,ProjectTimeline,CookiePopup,SearchBar,EditButton],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    //MarkdownModule.forChild(),
    RouterModule.forRoot(appRoutes)
  ],
  //providers: [CookieService],
  bootstrap: [AppComponent]
})

export class AppModule {}
