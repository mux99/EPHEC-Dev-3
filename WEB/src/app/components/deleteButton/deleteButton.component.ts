import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'delete-button',
  styleUrls: ['./deleteButton.component.scss'],

  template: '<button type="remove">delete project</button>'
})

export class DeleteButton {}