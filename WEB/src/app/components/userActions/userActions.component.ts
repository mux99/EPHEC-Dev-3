import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { getCookie } from 'src/app/app.module';
import { RefreshService } from 'src/shared-services/refresh.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'user-actions',
  templateUrl: './userActions.component.html',
  styleUrls: ['./userActions.component.scss']
})

export class UserActions {
  constructor(private router: Router, private refreshService: RefreshService) {}

  ngOnInit() {
    this.refreshService.shouldBeRefreshed$.subscribe(
      () => this.init()
    );
  }

  userIconClick() {
    let panel = document.getElementById("UserActions");
    if (panel?.classList.contains("visible")) {
      panel.classList.add("hidden");
      panel.classList.remove("visible");
      console.log("test");
    }
    else {
      panel?.classList.remove("hidden");
      panel?.classList.add("visible");
      console.log("test2");
    }
  }


  userConnectClick() {
    this.router.navigate(['/sign-in']);
    const element = document.querySelector('landing-page');
    element?.parentNode?.removeChild(element);
  }

  init() {
    let email = getCookie("email");
    const userConnect = document.getElementById("userConnect");
    const userIcon = document.getElementById("userIcon");

    if (userIcon != null) {
      userIcon.style.backgroundImage = `url("https://www.gravatar.com/avatar/${Md5.hashStr(email)}")`;
    }

    //connected?
    if (email != "") {
      if (userConnect != null) {
        userConnect.style.display = "none";
      }
      if (userIcon != null) userIcon.style.display = "block";
    }
  }
}
