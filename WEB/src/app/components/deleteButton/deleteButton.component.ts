import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'delete-button',
  styleUrls: ['./deleteButton.component.scss'],

  template: '<button (click)="click()" type="remove">delete project</button>'
})

export class DeleteButton {
  @Output() childEvent = new EventEmitter<string>();
  
  click() {
    this.childEvent.emit();
  }
}