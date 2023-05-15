import { Component } from '@angular/core';

@Component({
  selector: 'option-popup',
  templateUrl: './optionPopup.component.html',
  styleUrls: ['./optionPopup.component.scss']
})
export class OptionPopup {
  values: { name: string, days: string }[] = [];

  removeInput(i: number) {
    this.values.splice(i, 1);
  }

  addInput() {
    this.values.push({ name: "", days: "" });
  }
}
