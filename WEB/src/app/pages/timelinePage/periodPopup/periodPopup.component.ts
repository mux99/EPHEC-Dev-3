import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'period-popup',
  templateUrl: './periodPopup.component.html',
  styleUrls: ['./periodPopup.component.scss']
})
export class PeriodPopup implements AfterViewInit {
  colors = ["#ff3737","#ff8337","#c29867","#ffe272","#9de16f","#36d8b7","#53afff","#212e4a","#de6fff","#ff74bc","#bccdde","#222831"];
  name = "";
  description = "";
  start = {y: 0, m: 0, d: 0};
  end = {y: 0, m: 0, d: 0};
  color = "";

  name_holder = "";
  description_holder = "";
  start_holder = {y: 0, m: 0, d: 0};
  end_holder = {y: 0, m: 0, d: 0};

  can_edit = false;
  timeline_id: any;
  period_id: any;

  @Input() data: any;
  @ViewChild('colorDivs') colorDivsRef!: ElementRef;
  @Output() hide = new EventEmitter();
  quit() {this.hide.emit()}

  constructor(
    private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngAfterViewInit() {
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.timeline_id = paramMap.get('tid');
    });
    console.log(this.data)
    this.period_id = this.data.id;
    this.name = this.data.title;
    this.color = this.data.color;
    this.description = this.data.description;
    let tmp = this.data.start.split("/");
    this.start = {y: tmp[0], m: tmp[1], d: tmp[2]};
    let tmp2 = this.data.end.split("/");
    this.end = {y: tmp2[0], m: tmp2[1], d: tmp2[2]};
  }

  edit(action: string) {
    console.log(this.color);
    if (action == "edit") {
      this.start_holder = this.start;
      this.end_holder = this.end;
      this.name_holder = this.name;
      this.description_holder = this.description;
      this.can_edit = true;
    }
    else {
      this.can_edit = false;
    }
    if (action == "save") {
      let params = ""
      params += `n=${this.name}&`;
      params += `s=${this.start.y}/${this.start.m}/${this.start.d}&`;
      params += `e=${this.end.y}/${this.end.m}/${this.end.d}&`;
      params += `c=${encodeURIComponent(this.color)}`;
      let obs = this.http.put(`/api/timelines/${this.timeline_id}/periods/${this.period_id}?${params}`, {},this.auth.get_header());
      obs.subscribe();
    }
    else if (action == "cancel") {
      this.start = this.start_holder;
      this.end = this.end_holder;
      this.name = this.name_holder;
      this.description = this.description_holder;
    }
  }
}
