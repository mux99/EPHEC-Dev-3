import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-actions',
  templateUrl: './userActions.component.html',
  styleUrls: ['./userActions.component.scss']
})

export class UserActions {

  getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
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

  constructor(private router: Router) {}
  userConnectClick() {
    this.router.navigate(['/sign-in']);
    const element = document.querySelector('landing-page');
    element?.parentNode?.removeChild(element);
  }

  ngOnInit() {
    let email = this.getCookie("email");
    let connectButton = document.getElementById("userConnect");
    let userButton = document.getElementById("userIcon");

    //connected?
    if (email != "") {
      if (connectButton?.style.display) {
        connectButton.style.display = "none";
      }
      if (userButton?.style.display) {
        userButton.style.display = "block";
      }
    }
  }
}
