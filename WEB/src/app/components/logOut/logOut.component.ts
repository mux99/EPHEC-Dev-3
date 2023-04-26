import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';
import { UserActions } from '../userActions/userActions.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'log-out',
  template: ''
})

export class LogOut {
    constructor(private router: Router,private auth: AuthService, private uaction: UserActions) {}

    ngOnInit() {
        this.auth.logout()
        this.uaction.disconnect()
        this.router.navigate(['/']);
    }
}