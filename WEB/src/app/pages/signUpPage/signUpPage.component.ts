import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { UserActions } from 'src/app/components/userActions/userActions.component';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'sign-up-page',
  templateUrl: './signUpPage.component.html',
  styleUrls: ['./signUpPage.component.scss']
})

@Injectable()
export class SignUpPage {
  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private cookieService: CookieService
  ) {}

  onClickSubmit(data: any) { 
    let obs;
    if (data.password == data.password2) {
      obs=this.http.post(`/api/users?n=${data.username}&e=${data.email}&p=${data.password}`, {});
      obs.subscribe(
        (obs_data: any) => {
            this.cookieService.set("session",obs_data.token,60,undefined,undefined,true,"Lax");
            this.auth.wake()
            this.router.navigate(["/"]);
        }
      )
    }
    else {
      alert("passwords doesn't match");
    }
 } 
}