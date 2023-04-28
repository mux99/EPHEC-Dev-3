import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isUserLoggedIn: boolean = false;
    httpHeader: any;

    public triggerUserIcon$: Subject<string> = new Subject<string>();

    constructor (
        private http: HttpClient,
        private cookieService: CookieService
        ) {}

    login(email: string, password: string): Observable<any> {
        let obs = this.http.post(`/api/login?e=${email}&p=${password}`, {});
        obs.subscribe(
            (obs_data: any) => {
                this.isUserLoggedIn = obs_data.check;
                if (obs_data.check) {
                    this.cookieService.set("session",obs_data.token,60,undefined,undefined,true,"Strict");
                    this.httpHeader = { headers: { Authorization: `Bearer ${obs_data.token}`} };
                    this.triggerUserIcon$.next(email);
                }
            }
        )
        return obs;
    }

    logout() {
        this.isUserLoggedIn = false;
        this.cookieService.delete("session");
        let obs = this.http.delete(`/api/login/?a=true`, this.httpHeader);
        obs.subscribe();
    }

    wake() {
        if (this.cookieService.check("session")) {
            let token = this.cookieService.get("session");
            this.isUserLoggedIn = true;
            this.httpHeader = { headers: { Authorization: `Bearer ${token}`} };
            let obs = this.http.get("/api/me", this.httpHeader);
            obs.subscribe(
                (obs_data: any) => {
                    this.triggerUserIcon$.next(obs_data.email);
                }
            );
        }
    }
}