import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/shared-services/auth.service';
import { Md5 } from 'ts-md5';
import { HttpClient } from '@angular/common/http';

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
  is_connected = false;
  url_image = "https://placehold.co/400x400"

  @ViewChild('userConnect') public connect_ref!: ElementRef;
  @ViewChild('userIcon') icon_ref!: ElementRef;
  @ViewChild('userPanel') panel_ref!: ElementRef;
  @ViewChild('name') name_ref!: ElementRef;
  @ViewChild('tag') tag_ref!: ElementRef;

  constructor(private router: Router, private http: HttpClient, private auth: AuthService) {
    this.panel_visible = true;
  }

  public triggerUserIcon$: Subject<string> = this.auth.triggerUserIcon$;

  ngOnInit() {
    this.triggerUserIcon$.subscribe((data:any) => {
      this.connect(data.email);
      this.name_ref.nativeElement.innerHTML = data.name;
      this.tag_ref.nativeElement.innerHTML = `#${data.tag}`;
    });
  }

  userIconClick() {
    this.panel_visible = !this.panel_visible;
    if (this.panel_visible) {
      this.panel_ref.nativeElement.classList.add('panel_off');
      this.panel_ref.nativeElement.classList.remove('panel_on');
    } else {
      this.panel_ref.nativeElement.classList.remove('panel_off');
      this.panel_ref.nativeElement.classList.add('panel_on');
    }
  }

  userConnectClick() {
    this.router.navigate(['/sign-in']);
  }

  userDisconnectClick() {
    this.auth.logout();
    this.disconnect();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 10);
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }

  connect(email: string) {
    this.is_connected = true;
    this.url_image = `https://www.gravatar.com/avatar/${Md5.hashStr(email)}?d=retro`;
  }

  disconnect() {
    this.is_connected = false;
    this.url_image = 'https://placehold.co/400x400';
    this.panel_visible = true;
  }
}
