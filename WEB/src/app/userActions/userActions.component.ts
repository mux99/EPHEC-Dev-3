import { Component } from '@angular/core';

@Component({
  selector: 'user-actions',
  templateUrl: './userActions.component.html',
  styleUrls: ['./userActions.component.scss']
})

export class UserActions {
  onClick() {
    var panel = document.getElementById("UserActions");
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
}
