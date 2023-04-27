import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'edit-timeline',
  styleUrls: ['./editTimeline.component.scss'],

  template: '<button #edit id="edit" (click)="toggleSection()"></button><div id="buttonOption" [hidden]="!displaySection"><input type="search" placeholder="Search..."><p>its a test</p></div>'
})

export class EditTimeline {
    displaySection = false;

  toggleSection() {
    this.displaySection = !this.displaySection;
  }
}
