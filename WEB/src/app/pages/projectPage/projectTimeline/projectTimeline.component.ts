import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-timeline',
  styleUrls: ['./projectTimeline.component.scss'],

  template: '<div></div><p>tmp</p>'
})

export class ProjectTimeline {
  @Input() timeline_id!: string;
}
