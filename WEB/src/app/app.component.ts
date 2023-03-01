import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tmp';
  status: any;
  constructor(private _http: HttpClient){

  }

  ngOnInit(): void {
    this.status = this._http.get("/api/status").subscribe(msg => {
      this.status = msg;
      console.log(msg);
    })
  }
}
