import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserActions } from 'src/app/components/userActions/userActions.component';

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
    private uaction: UserActions
  ) {}

  onClickSubmit(data: any) { 
    let obs;
    if (data.password == data.password2) {
      obs=this.http.post(`/api/users?n=${data.username}&e=${data.email}&p=${data.password}`, {});
      obs.subscribe(
        (sub_data: any) => {
          if (sub_data.check) {
            this.uaction.connect(data.email);
            this.router.navigate(["/"]);
          }
        }
      )
    }
    else {
      alert("passwords doesn't match");
    }
 } 
}