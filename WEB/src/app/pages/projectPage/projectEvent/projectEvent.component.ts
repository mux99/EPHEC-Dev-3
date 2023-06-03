import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'project-event',
  styleUrls: ['./projectEvent.component.scss'],

  template: '<h4>{{ event.title }}</h4><p>{{ event.description }}</p>'
})

export class ProjectEvent {
  @Input() event!: any;
}
