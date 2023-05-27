import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'timeline-period',
  styleUrls: ['./timelinePeriod.component.scss'],
  template: '<p #name>Period Name</p>',
  host: {
    "(click)": "click()"
 }
})

export class TimelinePeriod {
  @Input() data!: any;
  @ViewChild("name") name_ref !: ElementRef;

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    // this.elementRef.nativeElement.style.left = `${this.left}%`;
    // this.elementRef.nativeElement.style.width = `${this.width}%`;
    // this.elementRef.nativeElement.style.top = `${this.top}%`;
    // this.elementRef.nativeElement.style.backgroundColor = `${this.color}`;
    // this.name_ref.nativeElement.innerHTML = this.name;
  }

  click() {
    this.clicked.emit(this.data)
  }
}