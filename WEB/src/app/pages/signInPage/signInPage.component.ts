import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserActions } from 'src/app/components/userActions/userActions.component';

@Component({
  selector: 'sign-in-page',
  templateUrl: './signInPage.component.html',
  styleUrls: ['./signInPage.component.scss']
})

export class SignInPage {
  constructor(private router: Router, private http: HttpClient, private uaction: UserActions) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // remove this component from the DOM
        document.querySelectorAll('[rel$="-page"]').forEach(item => {
          let tag = false;
          if (item.tagName != 'sign-in-page' || tag) {
            item.parentNode?.removeChild(item);
          } else {
            tag = true;
          }
        });
      });
  }

  onClickSubmit(data: any) {
    let obs=this.http.post(`/api/login?e=${data.email}&p=${data.password}`, {});
    obs.subscribe(
      (sub_data: any) => {
        if (sub_data.check) {
          //call connect on useractions
          this.uaction.connect(data.email);
        }
      }
    )
  }
}