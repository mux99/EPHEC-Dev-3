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
  isReadOnly = true;
  name_holder: string | undefined;
  desc_holder: string | undefined;
  start_holder: any;
  end_holder: any;

  d_year: number;
  d_month: Array<number>;

  timeline_id: any;
  project_id: any;

  constructor(
    private http: HttpClient,
    private _Activatedroute: ActivatedRoute,
    private host: ElementRef,
    private auth: AuthService) {
    this.d_year = 356.25;
    this.d_month = [31,28,31,30,31,30,31,31,30,31,30,31];
  }

  @ViewChild("name") name_ref!: ElementRef;
  @ViewChild("desc") desc_ref!: ElementRef;

  @ViewChild("syear") s_year_ref!: ElementRef;
  @ViewChild("smonth") s_month_ref!: ElementRef;
  @ViewChild("sday") s_day_ref!: ElementRef;

  @ViewChild("eyear") e_year_ref!: ElementRef;
  @ViewChild("emonth") e_month_ref!: ElementRef;
  @ViewChild("eday") e_day_ref!: ElementRef;

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
      this.name_holder = this.name_ref.nativeElement.innerHTML;
      this.desc_holder = this.desc_ref.nativeElement.innerHTML;
      this.start_holder = {y: this.s_year_ref.nativeElement.value, m: this.s_month_ref.nativeElement.value, d: this.s_day_ref.nativeElement.value}
      this.end_holder = {y: this.e_year_ref.nativeElement.value, m: this.e_month_ref.nativeElement.value, d: this.e_day_ref.nativeElement.value}

      this.name_ref.nativeElement.setAttribute("contenteditable","true");
      this.desc_ref.nativeElement.setAttribute("contenteditable","true");
      this.isReadOnly = false;
    }
    else {
      this.name_ref.nativeElement.setAttribute("contenteditable","false");
      this.desc_ref.nativeElement.setAttribute("contenteditable","false");
      this.isReadOnly = true;
    }
    if (action == "cancel") {
      this.name_ref.nativeElement.innerHTML = this.name_holder;
      this.desc_ref.nativeElement.innerHTML = this.desc_holder;
      this.s_year_ref.nativeElement.value = this.start_holder.y;
      this.s_month_ref.nativeElement.value = this.start_holder.m;
      this.s_day_ref.nativeElement.value = this.start_holder.d;
      this.e_year_ref.nativeElement.value = this.end_holder.y;
      this.e_month_ref.nativeElement.value = this.end_holder.m;
      this.e_day_ref.nativeElement.value = this.end_holder.d;
    }
    else if (action == "save") {
      let n = this.name_ref.nativeElement.innerHTML;
      let d = this.desc_ref.nativeElement.innerHTML;
      let s = this.datetodays(`${this.s_year_ref.nativeElement.value}/${this.s_month_ref.nativeElement.value}/${this.s_day_ref.nativeElement.value}`);
      let e = this.datetodays(`${this.e_year_ref.nativeElement.value}/${this.e_month_ref.nativeElement.value}/${this.e_day_ref.nativeElement.value}`);
      let obs = this.http.put(`/api/timelines/${this.timeline_id}?n=${n}&d=${d}&s=${s}&e=${e}`, {},this.auth.httpHeader);
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
