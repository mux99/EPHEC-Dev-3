import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { ThemeService } from './theme.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isUserLoggedIn: boolean = false;
    private httpHeader: any;

    public triggerUserIcon$: Subject<any> = new Subject<any>();

    constructor (
        private http: HttpClient,
        private cookieService: CookieService,
        private theme: ThemeService
        ) {}
    
    get_header() {
        if (this.httpHeader != undefined && this.isUserLoggedIn) {
            return {headers: this.httpHeader};
        }
        return {};
    }

    login(email: string, password: string): Observable<any> {
        let obs = this.http.post(`/api/login?e=${email}&p=${password}`, {});
        obs.subscribe(
            (obs_data: any) => {
                this.isUserLoggedIn = obs_data.check;
                if (obs_data.check) {
                    this.cookieService.set("session",obs_data.token,60,undefined,undefined,true,"Lax");
                    this.httpHeader = { Authorization: `Bearer ${obs_data.token}`};
                    this.triggerUserIcon$.next(email);
                }
            }
        )
        return obs;
    }

    logout() {
        this.isUserLoggedIn = false;
        this.cookieService.delete("session");
        let obs = this.http.delete(`/api/login/?a=true`, this.get_header());
        obs.subscribe();
    }

    wake() {
        if (this.cookieService.check("session")) {
            let token = this.cookieService.get("session");
            this.isUserLoggedIn = true;
            this.httpHeader = { Authorization: `Bearer ${token}`};
            let obs = this.http.get("/api/me", this.get_header());
            obs.subscribe(
                (obs_data: any) => {
                    this.triggerUserIcon$.next({email:obs_data.email, name:obs_data.name, tag:obs_data.tag});
                    this.theme.setTheme(obs_data.theme);
                }
            );
        }
        else {
            this.theme.setTheme(this.theme.default);
        }
    }
}