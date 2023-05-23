import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';
import { EventEdit } from 'src/shared-services/eventEdit.service';

@Component({
  selector: 'event-popup',
  templateUrl: './eventPopup.component.html',
  styleUrls: ['./eventPopup.component.scss']
})

export class EventPopup {
  eventId = "";
  isReadOnly = true;

  name_holder: string | undefined;
  desc_holder: string | undefined;
  year_holder: string | undefined;
  month_holder: string | undefined;
  day_holder: string | undefined;

  timeline_id: any;
  project_id: any;

  constructor(
    private eventEdit: EventEdit,
    private host: ElementRef,
    private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService
  ){}

  @ViewChild("name") name_ref!: ElementRef;
  @ViewChild("year") year_ref!: ElementRef;
  @ViewChild("month") month_ref!: ElementRef;
  @ViewChild("day") day_ref!: ElementRef;
  @ViewChild("desc") desc_ref!: ElementRef;

  //close popup
  @Output() hide = new EventEmitter();
  quit() {this.hide.emit()}

  ngAfterViewInit() {
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.timeline_id = paramMap.get('tid'); 
      this.project_id = paramMap.get('pid');
    });
    this.eventEdit.makeEditable$.subscribe(
      (data: any) => this.init(data)
    );
  }

  edit(action: string) {
    if (action == "edit") {
      this.name_holder = this.name_ref.nativeElement.innerHTML;
      this.desc_holder = this.desc_ref.nativeElement.innerHTML;
      this.year_holder = this.year_ref.nativeElement.value;
      this.month_holder = this.month_ref.nativeElement.value;
      this.day_holder = this.day_ref.nativeElement.value;

      this.name_ref.nativeElement.setAttribute("contenteditable","true");
      this.name_ref.nativeElement.addEventListener("keydown", function(event: any) {if (event.key === "Enter") {event.preventDefault();}});
      this.isReadOnly = false;
      this.desc_ref.nativeElement.setAttribute("contenteditable","true");
    }
    else {
      this.name_ref.nativeElement.setAttribute("contenteditable","false");
      this.isReadOnly = true
      this.desc_ref.nativeElement.setAttribute("contenteditable","false");
    }
    if (action == "save") {
      let n = this.name_ref.nativeElement.innerHTML;
      let t = this.desc_ref.nativeElement.innerHTML;
      let y = this.year_ref.nativeElement.value;
      let m = this.month_ref.nativeElement.value;
      let d = this.day_ref.nativeElement.value;
      let date = y + "/" + m + "/" + d;
      let obs = this.http.put(`/api/projects/${this.project_id}/events/${this.eventId}?title=${n}&description=${t}&date=${date}`, {},this.auth.get_header());
      obs.subscribe();
    }
    else if (action == "cancel") {
      this.name_ref.nativeElement.innerHTML = this.name_holder;
      this.desc_ref.nativeElement.innerHTML = this.desc_holder;
      this.year_ref.nativeElement.value = this.year_holder;
      this.month_ref.nativeElement.value = this.month_holder;
      this.day_ref.nativeElement.value = this.day_holder;
    }
  }

  init(data: any) {
    this.eventId = data.id;
    this.name_ref.nativeElement.innerHTML = data.title;
  }
}
