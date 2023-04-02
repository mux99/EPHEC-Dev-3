import { ArrayType } from '@angular/compiler';
import { Component, HostListener, Input } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'timeline-page',
  templateUrl: './timelinePage.component.html',
  styleUrls: ['./timelinePage.component.scss']
})

export class TimelinePage {
  timelineScale: number;
  constructor(private router: Router) {
    this.timelineScale = 100;
  }

  @Input() json_events!: Array<Object>; json_timeline!: string;

  ngOnInit() {
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
    
    //EVENTS
    let timeline = JSON.parse(this.json_timeline);

    //calcuate starting day
    let timeline_start = timeline.start.split("/");
    let start = timeline_start[0]+(timeline_start[2]*timeline.d_year);
    for (let i = 0; i < timeline_start[1]; i++) {
      start += timeline.d_month[i];
    }
    
    //calcuate ending day
    let timeline_stop = timeline.stop.split("/");
    let stop = timeline_stop[0]+(timeline_stop[2]*timeline.d_year);
    for (let i = 0; i < timeline_stop[1]; i++) {
      stop += timeline.d_month[i];
    }
    
    let lenght = stop - start;
    for (let i = 0; i < this.json_events.length; i++) {
      //TBD create timeline event object with it's variables
    }
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
}
