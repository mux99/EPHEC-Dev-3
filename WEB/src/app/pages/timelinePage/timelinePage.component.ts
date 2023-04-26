import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ElementRef, EnvironmentInjector, HostListener, Input, ViewChild, createComponent } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';
import { TimelineEvent } from './timelineEvent/timelineEvent.component';

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

  constructor(
    private http: HttpClient,
    private envinjector: EnvironmentInjector,
    private applicationRef: ApplicationRef,
    private _Activatedroute: ActivatedRoute
  ) {
    this.timelineScale = 1;
    this.d_year = 0;
    this.d_month = [];
  }

  @ViewChild("events") events!: ElementRef;
  @ViewChild("container") container!: ElementRef;

  ngOnInit() {
    //fetch id from url
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.timeline_id = paramMap.get('id'); 
    });
    
    //querry timeline data from api
    let obs = this.http.get(`/api/timelines/${this.timeline_id}`);
    obs.subscribe(
      (data: any) => {
        //load timeline data
        this.d_year = data.d_year;
        this.d_month = data.d_month;

        //load events
        for (let i = 0; i < data.events; i++) {
          //create event instance
          let elem = createComponent(TimelineEvent, {
            environmentInjector: this.envinjector,
            hostElement: this.events.nativeElement
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

  @HostListener('wheel', ['$event'])
  onWheelScroll(event: WheelEvent) {
    let old_width = parseInt(window.getComputedStyle(this.events.nativeElement).getPropertyValue("width"));
    let mouse_pos = (event.clientX - parseInt(window.getComputedStyle(this.container.nativeElement).getPropertyValue("margin-left")));
    let offset = (parseInt(this.container.nativeElement.scrollLeft)+mouse_pos);

    this.timelineScale += (event.deltaY / 2000) * parseInt(window.getComputedStyle(this.container.nativeElement).getPropertyValue("width"));
    this.events.nativeElement.style.width = `${this.timelineScale}px`;
    let new_width = parseInt(window.getComputedStyle(this.events.nativeElement).getPropertyValue("width"));

    console.log(offset, new_width, old_width, mouse_pos)
    this.container.nativeElement.scrollLeft = ((offset * new_width) / old_width) - mouse_pos;
  }

  datetodays(date: string) {
    let date_array = date.split("/").map(function(n,_i,_a){return Number(n);},this);
    let days = date_array[0]+(date_array[2]*this.d_year);
    for (let i = 0; i < date_array[1]; i++) {
      days += this.d_month[i];
    }
    return days;
  }
}
