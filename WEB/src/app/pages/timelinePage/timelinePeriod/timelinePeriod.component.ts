import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DateService } from 'src/shared-services/date.service';

@Component({
  selector: 'timeline-period',
  styleUrls: ['./timelinePeriod.component.scss'],
  template: '<p>{{ data.title }}</p>',
  host: {
    "(click)": "click()"
 }
})

export class TimelinePeriod {
  @Input() data!: any;
  @ViewChild("name") name_ref !: ElementRef;

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private elementRef: ElementRef,
    private date: DateService
    ) { }

  ngAfterViewInit() {
    let tmp = this.date.get_period(this.data.start, this.data.end);
    this.elementRef.nativeElement.style.left = `${tmp.pos}%`;
    this.elementRef.nativeElement.style.width = `${tmp.width}%`;
    this.elementRef.nativeElement.style.top = `calc(${tmp.top} * var(--buble-size))`;
    this.elementRef.nativeElement.style.backgroundColor = `${this.data.color}`;
  }

  click() {
    this.clicked.emit(this.data)
  }
}