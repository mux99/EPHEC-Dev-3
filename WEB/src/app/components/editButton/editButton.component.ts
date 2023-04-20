import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'edit-button',
  styleUrls: ['./editButton.component.scss'],

  template: '<button #edit id="edit" (click)="click(\'edit\')"></button><button #save id="save" (click)="click(\'save\')"></button><button #cancel id="cancel" (click)="click(\'cancel\')"></button>'
})

export class EditButton {
  @Output() childEvent = new EventEmitter<string>();

  @ViewChild('edit') edit_ref!: ElementRef;
  @ViewChild('save') save_ref!: ElementRef;
  @ViewChild('cancel') cancel_ref!: ElementRef;
  
  click(action: string) {
    if (action == 'edit') {
      this.edit_ref.nativeElement.style.display = "none";
      this.cancel_ref.nativeElement.style.display = "block";
      this.save_ref.nativeElement.style.display = "block";
    } else {
      this.edit_ref.nativeElement.style.display = "block";
      this.cancel_ref.nativeElement.style.display = "none";
      this.save_ref.nativeElement.style.display = "none";
    }
    this.childEvent.emit(action);
  }
}
