import { Component } from '@angular/core';
import { AuthService } from 'src/shared-services/auth.service';

export interface StatusMsg {
  msg: string;
}
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><user-actions></user-actions>',
})
export class AppComponent {
  constructor(private auth: AuthService) {}
  
  ngAfterViewInit() {
    this.auth.wake()
  }
}
