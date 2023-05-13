import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'timeline-event',
  styleUrls: ['./timelineEvent.component.scss'],

  template: '<div id="img"></div><span #text>text</span>'
})

export class TimelineEvent {
  @Input() data!: any; pos!: number;

  @ViewChild("text") text!: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    console.log(this.data);
    this.text.nativeElement.innerHTML = this.data.title;
    this.elementRef.nativeElement.style.left = `${this.pos}%`
  }
}
