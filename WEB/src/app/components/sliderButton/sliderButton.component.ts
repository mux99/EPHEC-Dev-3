import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'slider-button',
  styleUrls: ['./sliderButton.component.scss'],

  template: '<input type="checkbox" id="slider" /><label for="slider">Toggle</label>'
})

export class SliderButton {}