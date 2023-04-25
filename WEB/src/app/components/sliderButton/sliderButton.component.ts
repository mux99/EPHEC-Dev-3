import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'slider-button',
  styleUrls: ['./sliderButton.component.scss'],

  template: '<input (click)="click()" type="checkbox" id="slider" /><label for="slider">Toggle</label>'
})

export class SliderButton {
  @Output() childEvent = new EventEmitter<string>();
  @ViewChild("checkbox") checkbox!: ElementRef;

  setState(state: boolean) {
    let tmp = <HTMLInputElement> document.getElementById("slider");
    tmp.checked = state;
  }
  
  click() {
    let tmp = <HTMLInputElement> document.getElementById("slider");
    this.childEvent.emit(tmp.checked ? "true" : "false");
  }
}