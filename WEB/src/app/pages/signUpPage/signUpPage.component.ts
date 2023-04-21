import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { UserActions } from 'src/app/components/userActions/userActions.component';

@Component({
  selector: 'sign-up-page',
  templateUrl: './signUpPage.component.html',
  styleUrls: ['./signUpPage.component.scss']
})

@Injectable()
export class SignUpPage {
  constructor(private router: Router, private http: HttpClient, private uaction: UserActions) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // remove this component from the DOM
        document.querySelectorAll('[rel$="-page"]').forEach(item => {
          let tag = false;
          if (item.tagName != 'sign-up-page' || tag) {
            item.parentNode?.removeChild(item);
          } else {
            tag = true;
          }
        });
      });
  }

  onClickSubmit(data: any) { 
    let obs;
    if (data.password == data.password2) {
      obs=this.http.post(`/api/users?n=${data.username}&e=${data.email}&p=${data.password}`, {});
      obs.subscribe(
        (sub_data: any) => {
          if (sub_data.check) {
            //call connect on useractions
            this.uaction.connect(data.email);
          }
        }
      )
    }
    else {
      alert("passwords doesn't match");
    }
 } 
}