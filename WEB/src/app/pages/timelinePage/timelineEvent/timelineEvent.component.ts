import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'timeline-event',
  styleUrls: ['./timelineEvent.component.scss'],
  template: '<div id="img" (click)="click()"></div><span #text (click)="click()">text</span>'
})

export class TimelineEvent {
  @Input() data!: any;

  @ViewChild("text") text!: ElementRef;

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  ngAfterViewInit() {
    this.text.nativeElement.innerHTML = this.data.title;
    //this.elementRef.nativeElement.style.left = `${this.pos}%`
  }

  click() {
    this.clicked.emit(this.data);
  }
}
