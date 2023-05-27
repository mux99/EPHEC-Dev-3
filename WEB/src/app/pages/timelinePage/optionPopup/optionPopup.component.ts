import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'option-popup',
  templateUrl: './optionPopup.component.html',
  styleUrls: ['./optionPopup.component.scss']
})
export class OptionPopup {
  months: { n: string, d: number }[] = [];
  can_edit = false;
  name_holder = "";
  desc_holder = "";
  start_holder = {y: 0, m: 0, d: 0};
  end_holder = {y: 0, m: 0, d: 0};

  d_year = 0;

  timeline_id: any;
  project_id: any;

  start = {y: 0, m: 0, d: 0};
  end = {y: 0, m: 0, d: 0};

  name = "";
  description = "";

  constructor(
    private http: HttpClient,
    private _Activatedroute: ActivatedRoute,
    private auth: AuthService) {
  }

  @Input() data!: any;

  //close popup
  @Output() hide = new EventEmitter();
  quit() {this.hide.emit()}

  ngAfterViewInit() {
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.timeline_id = paramMap.get('tid'); 
      this.project_id = paramMap.get('pid');
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.name = this.data.name;
      this.description = this.data.description;
      this.months = this.data.d_month;
      this.d_year = this.data.d_year;
      let tmp = this.data.start.split("/");
      this.start = {y: tmp[0], m: tmp[1], d: tmp[2]};
      let tmp2 = this.data.end.split("/");
      this.end = {y: tmp2[0], m: tmp2[1], d: tmp2[2]};
    }
  }

  edit(action: string) {
    if (action == "edit") {
      this.name_holder = this.name;
      this.desc_holder = this.description;
      this.start_holder = this.start;
      this.end_holder = this.end;
      this.can_edit = true;
    }
    else {
      this.can_edit = false;
    }
    if (action == "cancel") {
      this.name = this.name_holder;
      this.description = this.desc_holder;
      this.start = this.start_holder;
      this.end = this.end_holder;
    }
    else if (action == "save") {
      let params = ""
      params += `n=${this.name}&`;
      params += `d=${this.description}&`;
      params += `s=${this.start.y}/${this.start.m}/${this.start.d}&`;
      params += `e=${this.end.y}/${this.end.m}/${this.end.d}&`;
      params += `j=${{d_year: this.d_year, d_month: this.months}}`
      let obs = this.http.put(`/api/timelines/${this.timeline_id}?${params}`, {},this.auth.get_header());
      obs.subscribe();
    }
  }

  datetodays(date: string) {
    let date_array = date.split("/").map(function(n,_i,_a){return Number(n);},this);
    let days = date_array[0]+(date_array[2]*this.d_year);
    for (let i = 0; i < date_array[1]; i++) {
      days += this.months[i].d;
    }
    return days;
  }

  removeInput(i: number) {
    this.months.splice(i, 1);
  }

  addInput() {
    this.months.push({ n: "", d: 0 });
  }
  numericOnly(event: KeyboardEvent): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
  
}
