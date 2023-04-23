import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'user-actions',
  templateUrl: './userActions.component.html',
  styleUrls: ['./userActions.component.scss']
})

export class UserActions {
  panel_visible: boolean;

  @ViewChild('userConnect')public connect_ref!: ElementRef;
  @ViewChild('userIcon') icon_ref!: ElementRef;
  @ViewChild('userPanel') panel_ref!: ElementRef;

  constructor(private router: Router) {
    this.panel_visible = false;
  }

  userIconClick() {
    this.panel_visible = !this.panel_visible;
    if (this.panel_visible) {
      this.panel_ref.nativeElement.classList.add("panel_off");
      this.panel_ref.nativeElement.classList.remove("panel_on");
    }
    else {
      this.panel_ref.nativeElement.classList.remove("panel_off");
      this.panel_ref.nativeElement.classList.add("panel_on");
    }
  }

  userConnectClick() {
    this.router.navigate(['/sign-in']);
  }

  connect(email: string) {
    let icon = document.getElementById("userIcon");
    let connect = document.getElementById("userConnect")
    icon?.classList.remove("hidden");
    if (icon != null) icon.style.backgroundImage = `url("https://www.gravatar.com/avatar/${Md5.hashStr(email)}")`;
    connect?.classList.add("hidden");
  }
}
