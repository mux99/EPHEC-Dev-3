import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'option-popup',
  templateUrl: './optionPopup.component.html',
  styleUrls: ['./optionPopup.component.scss']
})
export class OptionPopup {
  values: { name: string, days: string }[] = [];
  can_edit = false;
  name_holder = "";
  desc_holder = "";
  start_holder = {y: 0, m: 0, d: 0};
  end_holder = {y: 0, m: 0, d: 0};

  d_year: number;
  d_month: Array<number>;

  timeline_id: any;
  project_id: any;

  s_year = 0;
  s_month = 0;
  s_day = 0;

  e_year = 0;
  e_month = 0;
  e_day = 0;

  name = "";
  description = "";

  constructor(
    private http: HttpClient,
    private _Activatedroute: ActivatedRoute,
    private auth: AuthService) {
    this.d_year = 356.25;
    this.d_month = [31,28,31,30,31,30,31,31,30,31,30,31];
  }

  //close popup
  @Output() hide = new EventEmitter();
  quit() {this.hide.emit()}

  ngAfterViewInit() {
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.timeline_id = paramMap.get('tid'); 
      this.project_id = paramMap.get('pid');
    });
  }

  edit(action: string) {
    if (action == "edit") {
      this.name_holder = this.name;
      this.desc_holder = this.description;
      this.start_holder = {y: this.s_year, m: this.s_month, d: this.s_day}
      this.end_holder = {y: this.e_year, m: this.e_month, d: this.e_day}
      this.can_edit = true;
    }
    else {
      this.can_edit = false;
    }
    if (action == "cancel") {
      this.name = this.name_holder;
      this.description = this.desc_holder;
      this.s_year = this.start_holder.y;
      this.s_month= this.start_holder.m;
      this.s_day = this.start_holder.d;
      this.e_year = this.end_holder.y;
      this.e_month = this.end_holder.m;
      this.e_day = this.end_holder.d;
    }
    else if (action == "save") {
      let n = this.name;
      let d = this.description;
      let s = this.datetodays(`${this.s_year}/${this.s_month}/${this.s_day}`);
      let e = this.datetodays(`${this.e_year}/${this.e_month}/${this.e_day}`);
      let obs = this.http.put(`/api/timelines/${this.timeline_id}?n=${n}&d=${d}&s=${s}&e=${e}`, {},this.auth.get_header());
      obs.subscribe();
    }
  }

  datetodays(date: string) {
    let date_array = date.split("/").map(function(n,_i,_a){return Number(n);},this);
    let days = date_array[0]+(date_array[2]*this.d_year);
    for (let i = 0; i < date_array[1]; i++) {
      days += this.d_month[i];
    }
    return 0;
  }

  removeInput(i: number) {
    this.values.splice(i, 1);
  }

  addInput() {
    console.log(this.values)
    this.values.push({ name: "", days: "" });
  }
  numericOnly(event: KeyboardEvent): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
  
}
