import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';
import { setCookie } from 'src/app/app.module';
import { RefreshService } from 'src/shared-services/refresh.service';

@Component({
  selector: 'sign-in-page',
  templateUrl: './signInPage.component.html',
  styleUrls: ['./signInPage.component.scss']
})

export class SignInPage {
  constructor(private router: Router, private http: HttpClient, private refreshService: RefreshService) {}

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
    let obs=this.http.post(`/api/user?e=${data.email}&p=${data.password}`, {});
    obs.subscribe(
      (data: any) => {
        if (data.check) {
          setCookie("email",data.email,1,"");
          this.refreshService.refresh(data.username, data.tag);
        }
      }
    )
  }
}