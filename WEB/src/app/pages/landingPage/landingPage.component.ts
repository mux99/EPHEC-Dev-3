import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'landing-page',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.scss']
})

export class LandingPage {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    //routing
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // remove this component from the DOM
        document.querySelectorAll('[rel$="-page"]').forEach(item => {
          let tag = false;
          if (item.tagName != 'landing-page' || tag) {
            item.parentNode?.removeChild(item);
          } else {
            tag = true;
          }
        });
      });

    //loading public projects
    let obs = this.http.get('TBD');
    obs.subscribe(
      (data: any) => {
        let tmp = JSON.parse(data);
        for (let i = 0; i < tmp.length; i++) {
          //TBD create project small object with parameters
        }
      }
    )
  }
}
