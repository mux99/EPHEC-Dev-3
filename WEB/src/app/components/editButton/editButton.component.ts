import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'edit-button',
  styleUrls: ['./editButton.component.scss'],

  template: "<button (click)='click()'>edit</button>"
})

export class EditButton {
  @Output() childEvent = new EventEmitter<string>();
  
  click() {
    this.childEvent.emit('edit');
  }
}
