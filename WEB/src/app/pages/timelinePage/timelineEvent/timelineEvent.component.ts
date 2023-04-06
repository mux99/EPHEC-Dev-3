import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'timeline-event',
  styleUrls: ['./timelineEvent.component.scss'],

  template: '<div class="event"><div class="eventIcon"></div><div class="eventBar"></div><div #text class="eventText"></div></div>'
})

export class TimelineEvent {
  @Input() data!: any; pos!: number; 

  @ViewChild("text") text!: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.text.nativeElement.innerHTML = this.data.title;
    this.elementRef.nativeElement.style.right = `${this.pos}%`
  }
}
