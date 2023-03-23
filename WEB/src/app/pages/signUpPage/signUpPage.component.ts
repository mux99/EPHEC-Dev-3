import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'sign-up-page',
  templateUrl: './signUpPage.component.html',
  styleUrls: ['./signUpPage.component.scss']
})

@Injectable()
export class SignUpPage {
  cookieService = inject(CookieService)
  cookieValue = ""
  constructor(private router: Router, private http: HttpClient) {}

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
    if(data.password != data.password2){
        alert("passwords don't match")
    } else {
      const params = new HttpParams()
        .set("n", data.username)
        .set("e", data.email)
        .set("p", data.password)
      this.http.post(`/api/user`, null, {params: params}).subscribe(
        (r: any) => {
          this.cookieService.set('sessionKey', r.token)
          this.cookieValue = this.cookieService.get('sessionKey')
          this.router.navigate([''])
        }
      )
    }
 } 
}