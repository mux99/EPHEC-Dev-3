import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'sign-in-page',
  templateUrl: './signInPage.component.html',
  styleUrls: ['./signInPage.component.scss']
})

export class SignInPage {
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
          if (item.tagName != 'sign-in-page' || tag) {
            item.parentNode?.removeChild(item);
          } else {
            tag = true;
          }
        });
      });
  }

  onClickSubmit(data: any){
    const params = new HttpParams()
      .set("e", data.email)
      .set("p", data.password)
    this.http.post('/api/login', null, {params: params}).subscribe(
      (r: any) => {
        if(!r.check){
          alert("Incorrect Password")
          return
        }
        this.cookieService.set('sessionKey', r.token)
        this.cookieValue = this.cookieService.get('sessionKey')
        this.router.navigate([''])
      }
    )
  }
}