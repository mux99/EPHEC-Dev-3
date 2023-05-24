import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'period-popup',
  templateUrl: './periodPopup.component.html',
  styleUrls: ['./periodPopup.component.scss']
})
export class PeriodPopup implements AfterViewInit {
  @Input() data: any;

  @ViewChild('colorDivs') colorDivsRef!: ElementRef;

  //close popup
  @Output() hide = new EventEmitter();
  quit() {this.hide.emit()}

  ngAfterViewInit() {
    const colorDivs = this.colorDivsRef.nativeElement.querySelectorAll('.color');

    colorDivs.forEach((colorDiv: HTMLElement) => {
      colorDiv.addEventListener('click', () => {
        const color = colorDiv.style.backgroundColor;
        console.log('Selected color:', color);
    
        colorDivs.forEach((div: HTMLElement) => {
          div.style.border = '2px solid transparent';
        });
    
        colorDiv.style.border = '2px solid var(--text-color)';
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.init();
    }
  }

  init() {
  }
}
