import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { connect, filter } from 'rxjs/operators';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'sign-in-page',
  templateUrl: './signInPage.component.html',
  styleUrls: ['./signInPage.component.scss']
})

export class SignInPage {
  constructor(private router: Router, private auth: AuthService) {}

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
    let obs = this.auth.login(data.email, data.password);
    obs.subscribe(
      (obs_data: any) => {
        console.log(obs_data);
        if (obs_data.check) {
          this.router.navigate(["/"]);
        }
      }
    )
  }
}