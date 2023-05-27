import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DateService } from 'src/shared-services/date.service';

@Component({
  selector: 'timeline-event',
  styleUrls: ['./timelineEvent.component.scss'],
  template: '<div id="img" (click)="click()"></div><span #text (click)="click()">text</span>'
})

export class TimelineEvent {
  constructor(
    private date: DateService,
    private elementRef: ElementRef
  ) {}
  @Input() data!: any;

  @ViewChild("text") text!: ElementRef;

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  ngAfterViewInit() {
    this.text.nativeElement.innerHTML = this.data.title;
    let tmp = this.date.get_event(this.data.date);
    this.elementRef.nativeElement.style.left = `${tmp}%`
  }

  click() {
    this.clicked.emit(this.data);
  }
}
