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
    this.elementRef.nativeElement.style.left = `${this.date.get_pos(this.data.start)}%`;
    this.elementRef.nativeElement.style.width = `${this.date.get_len(this.data.start, this.data.end)}%`;
    // this.elementRef.nativeElement.style.top = `${this.top}%`;
    this.elementRef.nativeElement.style.backgroundColor = `${this.data.color}`;
  }

  click() {
    this.clicked.emit(this.data)
  }
}