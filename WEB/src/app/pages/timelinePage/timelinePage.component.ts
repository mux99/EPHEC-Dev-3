import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ElementRef, EnvironmentInjector, HostListener, Renderer2, ViewChild, createComponent } from '@angular/core';
import {  ActivatedRoute} from '@angular/router';
import { TimelineEvent } from './timelineEvent/timelineEvent.component';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'timeline-page',
  templateUrl: './timelinePage.component.html',
  styleUrls: ['./timelinePage.component.scss']
})

export class TimelinePage {
  timelineScale: number;
  d_year: number;
  d_month: Array<number>;
  timeline_id: any;
  project_id: any;

  constructor(
    private http: HttpClient,
    private envinjector: EnvironmentInjector,
    private applicationRef: ApplicationRef,
    private _Activatedroute: ActivatedRoute,
    private auth: AuthService,
    private renderer: Renderer2
  ) {
    this.timelineScale = 1;
    this.d_year = 0;
    this.d_month = [];
  }

  @ViewChild("periods") periods_ref!: ElementRef;
  @ViewChild("events") events_ref!: ElementRef;

  @ViewChild("container") container_ref!: ElementRef;
  @ViewChild("container2") container2_ref!: ElementRef;

  @ViewChild("altScroll") scroll_ref!: ElementRef;

  ngOnInit() {
    //fetch id from url
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.timeline_id = paramMap.get('tid'); 
      this.project_id = paramMap.get('pid');
    });
    
    //querry timeline data from api
    if(this.project_id == "import"){}
    else {
      let obs = this.http.get(`/api/projects/${this.project_id}/timelines/${this.timeline_id}`, this.auth.httpHeader);
      obs.subscribe(
        (data: any) => {
          //load timeline data
          this.d_year = data.d_year;
          this.d_month = data.d_month;

          //load events
          for (let i = 0; i < data.events; i++) {
            //create host container
            const tmp = this.renderer.createElement('div');
            this.renderer.appendChild(this.events_ref.nativeElement, tmp);

            //create event instance
            let elem = createComponent(TimelineEvent, {
              environmentInjector: this.envinjector,
              hostElement: tmp
            })
            //set elem inputs
            elem.instance.data = data.events[i];
            elem.instance.pos = (this.datetodays(data.events[i].date)/(this.datetodays(data.stop)-this.datetodays(data.start)))*100

            //add elem to view
            this.applicationRef.attachView(elem.hostView);
          }
        }
    )
    }
  }

  @HostListener('wheel', ['$event'])
  onWheelScroll(event: WheelEvent) {
    if (event.clientX == 0) {
      return;
    }
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

  datetodays(date: string) {
    let date_array = date.split("/").map(function(n,_i,_a){return Number(n);},this);
    let days = date_array[0]+(date_array[2]*this.d_year);
    for (let i = 0; i < date_array[1]; i++) {
      days += this.d_month[i];
    }
    return days;
  }

  toggleOptions() {}

  addEvent() {
    let obs = this.http.post(`/api/projects/${this.project_id}/events`, this.auth.httpHeader);
    obs.subscribe((data: any) => {});
  }
}
