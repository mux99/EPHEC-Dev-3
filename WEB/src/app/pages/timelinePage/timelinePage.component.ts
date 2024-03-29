import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {  ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';
import { DateService } from 'src/shared-services/date.service';
import { EventPopup } from './eventPopup/eventPopup.component';
import { PeriodPopup } from './periodPopup/periodPopup.component';

@Component({
  selector: 'timeline-page',
  templateUrl: './timelinePage.component.html',
  styleUrls: ['./timelinePage.component.scss']
})

export class TimelinePage {
  timelineScale: number;
  timeline_id: any;
  project_id: any;
  option_visible = false;
  event_visible = false;
  period_visible = false;
  new_choice_visible = false;

  tmp: any[] = [];
  events = this.tmp;
  periods = this.tmp;

  event_data: any;
  period_data: any;
  option_data: any;

  constructor(
    private http: HttpClient,
    private _Activatedroute: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private date: DateService
  ) {
    this.timelineScale = 1;
  }

  @ViewChild("periods_ref") periods_ref!: ElementRef;
  @ViewChild("events_ref") events_ref!: ElementRef;
  @ViewChild("container") container_ref!: ElementRef;
  @ViewChild("container2") container2_ref!: ElementRef;
  @ViewChild("altScroll") scroll_ref!: ElementRef;

  @ViewChild('event_popup') event_popup!: EventPopup;
  @ViewChild('period_popup') period_popup!: PeriodPopup;

  @ViewChild("options") options_ref!: ElementRef;

  goToProject() {this.router.navigate([`/p/${this.project_id}/`])}
  toggleOptions() {this.option_visible = !this.option_visible}

  ngAfterViewInit() {
    //fetch id from url
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.timeline_id = paramMap.get('tid'); 
      this.project_id = paramMap.get('pid');
    });
    
    //querry timeline data from api
    if(this.project_id == "import"){}
    else {
      let obs = this.http.get(`/api/projects/${this.project_id}/timelines/${this.timeline_id}`, this.auth.get_header());
      obs.subscribe(
        (obs_data: any) => {
          //load timeline data
          this.events = obs_data.events;
          this.periods = obs_data.periods;
          this.option_data = obs_data;
          this.date.init(obs_data.d_year, obs_data.d_month, obs_data.start, obs_data.end);
        });
    }
  }
  
  onWheelScroll(event: WheelEvent) {
    if (event.clientX == 0) return;

    let old_width = parseInt(window.getComputedStyle(this.periods_ref.nativeElement).getPropertyValue("width"));
    let mouse_pos = (event.clientX - parseInt(window.getComputedStyle(this.container_ref.nativeElement).getPropertyValue("margin-left")));
    let offset = (parseInt(this.container_ref.nativeElement.scrollLeft)+mouse_pos);

    this.timelineScale += (event.deltaY / 2000) * parseInt(window.getComputedStyle(this.container_ref.nativeElement).getPropertyValue("width"));

    //prevent underzooming
    if (this.timelineScale < this.container_ref.nativeElement.offsetWidth) {
      this.timelineScale = this.container_ref.nativeElement.offsetWidth;
    }
    this.periods_ref.nativeElement.style.width = `${this.timelineScale}px`;
    this.events_ref.nativeElement.style.width = `${this.timelineScale}px`;

    let new_width = parseInt(window.getComputedStyle(this.periods_ref.nativeElement).getPropertyValue("width"));
    let tmp = ((offset * new_width) / old_width) - mouse_pos;
    this.container_ref.nativeElement.scrollLeft = tmp;
    this.container2_ref.nativeElement.scrollLeft = tmp;
  }
  
  addEvent() {
    let obs = this.http.post(`/api/projects/${this.project_id}/timelines/${this.timeline_id}/events`, this.auth.get_header());
    obs.subscribe((data: any) => {
      this.event_visible = true;
      this.option_visible = false;
      this.period_visible = false;
      setTimeout(() => {
        this.event_popup.set_data(data,true);
      }, 10);
    });
  }
  
  addPeriod() {
    let obs = this.http.post(`/api/timelines/${this.timeline_id}/periods`, this.auth.get_header());
    obs.subscribe((data: any) => {
      this.period_visible = true;
      this.event_visible = false;
      this.option_visible = false;
      setTimeout(() => {
        this.period_popup.set_data(data,true);
      }, 10);
    });
  }

  showButtons() {
    this.new_choice_visible = !this.new_choice_visible;
  }

  editEvent(data: any) {
    this.event_visible = true;
    this.option_visible = false;
    this.period_visible = false;
    setTimeout(() => {
      this.event_popup.set_data(data);
    }, 10);
  }

  editPeriod(data: any) {
    this.period_visible = true;
    this.event_visible = false;
    this.option_visible = false;
    setTimeout(() => {
      this.period_popup.set_data(data);
    }, 10);
  }
}
