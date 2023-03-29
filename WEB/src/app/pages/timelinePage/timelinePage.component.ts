import { Component, HostListener } from '@angular/core';
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

  ngOnInit() {
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
