import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/shared-services/auth.service';
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

  constructor(private router: Router, private auth: AuthService) {
    this.panel_visible = true;
  }
  public triggerUserIcon$: Subject<string> = this.auth.triggerUserIcon$;

  ngOnInit() {
    this.triggerUserIcon$.subscribe((email: string) => {
      this.connect(email);
    });
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

  userDisconnectClick() {
    this.auth.logout();
    this.router.navigate(['/']);
    window.location.reload();
    this.disconnect();
  }

  connect(email: string) {
    let icon = document.getElementById("userIcon");
    let connect = document.getElementById("userConnect");
    icon?.classList.remove("hidden");
    if (icon != null) icon.style.backgroundImage = `url("https://www.gravatar.com/avatar/${Md5.hashStr(email)}?d=retro")`;
    connect?.classList.add("hidden");
  }

  disconnect() {
    let icon = document.getElementById("userIcon");
    let connect = document.getElementById("userConnect");
    let panel = document.getElementById("userPanel");
    icon?.classList.add("hidden");
    if (icon != null) icon.style.backgroundImage = 'https://placehold.co/400x400")';
    connect?.classList.remove("hidden");
    this.panel_visible = true;
    panel?.classList.add("panel_off");
    panel?.classList.remove("panel_on");
  }
}
