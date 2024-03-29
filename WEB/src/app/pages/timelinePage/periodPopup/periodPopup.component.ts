import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditButton } from 'src/app/components/editButton/editButton.component';
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
  write = false;
  timeline_id: any;
  period_id: any;

  @ViewChild('colorDivs') colorDivsRef!: ElementRef;
  @ViewChild('edit_button') edit_button!: EditButton;
  @Output() hide = new EventEmitter();

  constructor(
    private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngAfterViewInit() {
    this._Activatedroute.paramMap.subscribe(paramMap => {
      this.timeline_id = paramMap.get('tid');
    });
  }

  set_data(data: any, write: boolean = false) {
    this.period_id = data.id;
    this.name = data.title;
    this.color = data.color;
    this.description = data.description;
    let tmp = data.start.split("/");
    this.start = {y: tmp[0], m: tmp[1], d: tmp[2]};
    let tmp2 = data.end.split("/");
    this.end = {y: tmp2[0], m: tmp2[1], d: tmp2[2]};
    this.can_edit = false;
    this.edit_button.close()

    if (write) {
      this.write = true;
      this.can_edit = true;
    }
  }

  quit() {
    this.hide.emit()
    //if (this.write) this.delete();
  }

  delete() {
    let obs = this.http.delete(`/api/timelines/${this.timeline_id}/periods/${this.period_id}`, this.auth.get_header());
      obs.subscribe();
      setTimeout(() =>{
        window.location.reload();
      }, 100);
  }

  edit(action: string) {
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
      let httparams = new HttpParams()
      .set("n", this.name)
      .set("s", `${this.start.y}/${this.start.m}/${this.start.d}`)
      .set("e", `${this.end.y}/${this.end.m}/${this.end.d}`)
      .set("c", encodeURIComponent(this.color))
      .set("d", this.description);
      let obs = this.http.put(`/api/timelines/${this.timeline_id}/periods/${this.period_id}`, httparams,this.auth.get_header());
      obs.subscribe();
      setTimeout(() =>{
        window.location.reload();
      }, 100);
    }
    else if (action == "cancel") {
      this.start = this.start_holder;
      this.end = this.end_holder;
      this.name = this.name_holder;
      this.description = this.description_holder;
    }
  }
}
