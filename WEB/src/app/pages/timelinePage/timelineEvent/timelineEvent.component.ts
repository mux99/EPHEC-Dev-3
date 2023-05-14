import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EventEdit } from 'src/shared-services/eventEdit.service';

@Component({
  selector: 'timeline-event',
  styleUrls: ['./timelineEvent.component.scss'],
  template: '<div id="img" (click)="click()"></div><span #text (click)="click()">text</span>'
})

export class TimelineEvent {
  @Input() data!: any; pos!: number;

  @ViewChild("text") text!: ElementRef;

  constructor(private elementRef: ElementRef, private eventEdit: EventEdit) { }

  ngAfterViewInit() {
    this.text.nativeElement.innerHTML = this.data.title;
    this.elementRef.nativeElement.style.left = `${this.pos}%`
  }

  click() {
    this.eventEdit.click(this.data);
  }
}
