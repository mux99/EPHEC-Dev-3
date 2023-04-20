import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import { CookieService } from 'ngx-cookie-service';

export interface StatusMsg {
  msg: string;
}
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><user-actions></user-actions>',
  //providers: [CookieService]
})
export class AppComponent implements OnInit {
  title = 'tmp';
  status: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.status = this.http.get<StatusMsg>("/api/status").subscribe(msg => {
      console.log(msg.msg);
    })
  }
}
