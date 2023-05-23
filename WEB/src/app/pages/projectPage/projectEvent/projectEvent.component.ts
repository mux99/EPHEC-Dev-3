import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'project-event',
  styleUrls: ['./projectEvent.component.scss'],

  template: '<h2>{{ event.name }}</h2><p>{{ event.description }}</p>'
})

export class ProjectEvent {
  @Input() event!: any;
}
