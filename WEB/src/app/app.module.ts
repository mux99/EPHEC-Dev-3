import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserActions } from './userActions/userActions.component';
import { LandingPage } from './landingPage/landingPage.component';
import { TimelinePage } from './timelinePage/timelinePage.component';
import { ProjectSmall } from './projectSmall/projectSmall.component';

@NgModule({
  declarations: [AppComponent,UserActions,LandingPage,ProjectSmall,LandingPage,TimelinePage],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
