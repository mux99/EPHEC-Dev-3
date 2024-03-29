import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditButton } from 'src/app/components/editButton/editButton.component';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'event-popup',
  templateUrl: './eventPopup.component.html',
  styleUrls: ['./eventPopup.component.scss']
})

export class EventPopup {
  eventId = "";
  can_edit = false;
  write = false;

  title = "";
  description = "";
  year = 0;
  month = 0;
  day = 0;

  name_holder = "";
  desc_holder = "";
  year_holder = 0;
  month_holder = 0;
  day_holder = 0;

  timeline_id: any;
  project_id: any;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService
  ){}

  @ViewChild('edit_button') edit_button!: EditButton;
  //close popup
  @Output() hide = new EventEmitter();

  quit() {
    this.hide.emit()
    //if (this.write) this.delete();
  }

  ngAfterViewInit() {
    this._Activatedroute.paramMap.subscribe(paramMap => {
      this.timeline_id = paramMap.get('tid');
      this.project_id = paramMap.get('pid');
    });
  }

  set_data(data: any, write: boolean = false) {
    this.eventId = data.id;
    this.title = data.title;
    let tmp = data.date.split("/");
    this.year = tmp[0];
    this.month = tmp[1];
    this.day = tmp[2];
    this.description = data.description;
    this.can_edit = false;
    this.edit_button.close();

    if (write) {
      this.write = true;
      this.can_edit = true;
    }
  }

  delete() {
    let obs = this.http.delete(`/api/projects/${this.project_id}/events/${this.eventId}`, this.auth.get_header());
      obs.subscribe();
      setTimeout(() =>{
        window.location.reload();
      }, 100);
  }

  edit(action: string) {
    if (action == "edit") {
      this.name_holder = this.title;
      this.desc_holder = this.description;
      this.year_holder = this.year;
      this.month_holder = this.month;
      this.day_holder = this.day;
      this.can_edit = true;
    }
    else {
      this.can_edit = false;
    }
    if (action == "save") {
      let n = this.title;
      let t = this.description;
      let y = this.year;
      let m = this.month;
      let d = this.day;
      let date = y + "/" + m + "/" + d;
      let obs = this.http.put(`/api/projects/${this.project_id}/events/${this.eventId}?title=${n}&description=${t}&date=${date}`, {},this.auth.get_header());
      obs.subscribe();
      setTimeout(() =>{
        window.location.reload();
      }, 100);
    }
    else if (action == "cancel") {
      this.title = this.name_holder;
      this.description = this.desc_holder;
      this.year = this.year_holder;
      this.month = this.month_holder;
      this.day = this.day_holder;
    }
  }
}
