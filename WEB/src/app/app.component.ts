import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface StatusMsg {
  msg: string;
}
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><user-actions></user-actions>'
})
export class AppComponent implements OnInit {
  title = 'tmp';
  status: any;
  constructor(private _http: HttpClient){}

  ngOnInit(): void {
    this.status = this._http.get<StatusMsg>("/api/status").subscribe(msg => {
      console.log(msg.msg);
    })
  }
}
