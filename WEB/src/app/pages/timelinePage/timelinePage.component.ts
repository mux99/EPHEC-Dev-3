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

  constructor(private router: Router, private http: HttpClient, private envinjector: EnvironmentInjector, private applicationRef: ApplicationRef, private _Activatedroute: ActivatedRoute) {
    this.timelineScale = 100;
    this.d_year = 0;
    this.d_month = [];
  }

  @ViewChild("events") events!: ElementRef;

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.timeline_id = paramMap.get('id'); 
    });
    //ROUTING
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // remove this component from the DOM
        document.querySelectorAll('[rel$="-page"]').forEach(item => {
          let tag = false;
          if (item.tagName != 'timeline-page' || tag) {
            item.parentNode?.removeChild(item);
          } else {
            tag = true;
          }
        });
      });
    
    //TIMELINE
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
    const timeline = document.getElementById("timelineBody");
    console.log(event.deltaY);
    this.timelineScale += event.deltaY;
    if (timeline != null) {
      timeline.style.width = `${this.timelineScale}px`
    }
  }

  datetodays(date: string) {
    //calcuate starting day
    let date_array = date.split("/").map(function(n,_i,_a){return Number(n);},this);
    let days = date_array[0]+(date_array[2]*this.d_year);
    for (let i = 0; i < date_array[1]; i++) {
      days += this.d_month[i];
    }
    return days;
  }
}
