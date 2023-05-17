import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'timeline-period',
  styleUrls: ['./timelinePeriod.component.scss'],
  template: '<p #name>Period Name</p>'
})

export class TimelinePeriod {
  @Input() top!: number; left!: number; width!: number; name!: string; color!: string;
  @ViewChild("name") name_ref !: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.left = `${this.left}%`;
    this.elementRef.nativeElement.style.width = `${this.width}%`;
    this.elementRef.nativeElement.style.top = `${this.top}%`;
    this.elementRef.nativeElement.style.backgroundColor = `${this.color}`;
    this.name_ref.nativeElement.innerHTML = this.name;
  }
}