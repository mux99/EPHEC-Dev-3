import { ArrayType } from '@angular/compiler';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'timeline-event',
  styleUrls: ['./timelineEvent.component.scss'],

  template: '<div class="event"><div class="eventIcon"></div><div class="eventBar"></div><div #text class="eventText"></div></div>'
})

export class TimelineEvent {
  @Input() json_event!: string; timeline_start!: number; timeline_stop!: number; d_month!: Array<number>; d_year!: number; 

  @ViewChild("text") text!: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    let data = JSON.parse(this.json_event);

    let date = data.date.split("/");
    let pos = this.timeline_start+date[0]+(date[2]*this.d_year);
    for (let i = 0; i < date[1]; i++) {
      pos += this.d_month[i];
    }
    pos /= this.timeline_stop-this.timeline_start;
    pos *= 100;
    this.text.nativeElement.innerHTML = data.title;
    this.elementRef.nativeElement.style.right = `${pos}%`
  }
}
