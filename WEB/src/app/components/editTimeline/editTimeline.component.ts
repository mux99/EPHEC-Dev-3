import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'edit-timeline',
  styleUrls: ['./editTimeline.component.scss'],

  template: '<button #edit id="edit" (click)="toggleSection()"></button><div id="buttonOption" [hidden]="!displaySection"><search-bar></search-bar><p>its a test</p></div>'
})

export class EditTimeline {
    displaySection = false;

  toggleSection() {
    this.displaySection = !this.displaySection;
  }
}
