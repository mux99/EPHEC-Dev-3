import { Component, Input } from '@angular/core';

@Component({
  selector: 'timeline-event',
  styleUrls: ['./timelineEvent.component.scss'],

  template: '<div class="event"><div class="eventIcon"></div><div class="eventBar"></div><div class="eventText"></div></div>'
})

export class TimelineEvent {
  @Input() json!: string; pos!: number;

  ngOnInit() {
    
  } 
}
