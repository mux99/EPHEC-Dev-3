import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UserActions } from 'src/app/components/userActions/userActions.component';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isUserLoggedIn: boolean = false;

    constructor (private http: HttpClient, private uaction: UserActions, private cookieService: CookieService) {}

    login(email: string, password: string): Observable<any> {
        let obs = this.http.post(`/api/login?e=${email}&p=${password}`, {});
        obs.subscribe(
            (obs_data: any) => {
                this.isUserLoggedIn = obs_data.check;
                if (obs_data.check) {
                    this.cookieService.set("session",obs_data.token,60,undefined,undefined,true,"Strict");
                    this.uaction.connect(email);
                }
            }
        )
        return obs;
    }

    session_wake() {
        let token = this.cookieService.get("session");
        if (token != null) {
            let obs = this.http.post(`/api/session?t=${token}`, {});
            obs.subscribe(
                (obs_data: any) => {
                    this.isUserLoggedIn = obs_data.check;
                    if (obs_data.check) this.uaction.connect(obs_data.email)
                }
            )
        }
    }

    logout() {
        this.isUserLoggedIn = false;
        this.cookieService.delete("session");
    }
}