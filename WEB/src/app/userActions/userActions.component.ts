import { Component } from '@angular/core';

@Component({
  selector: 'user-actions',
  templateUrl: './userActions.component.html',
  styleUrls: ['./userActions.component.scss']
})

export class UserActions {
  setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

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

  userConnectClick() {

  }

  conncetionCheck() {
    let username = this.getCookie("username");
    let connectButton = document.getElementById("userConnect");
    let userButton = document.getElementById("userIcon");
    if (username != "") {
      if (connectButton?.style.display) {
        connectButton.style.display = "none";
      }
      if (userButton?.style.display) {
        userButton.style.display = "block";
      }
    }
  }
}
