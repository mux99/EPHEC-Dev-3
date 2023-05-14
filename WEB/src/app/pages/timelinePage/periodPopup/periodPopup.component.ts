import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'period-popup',
  templateUrl: './periodPopup.component.html',
  styleUrls: ['./periodPopup.component.scss']
})
export class PeriodPopup implements AfterViewInit {
  @ViewChild('colorDivs') colorDivsRef!: ElementRef;

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
}
