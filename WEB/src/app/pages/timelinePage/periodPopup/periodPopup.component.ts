import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'period-popup',
  templateUrl: './periodPopup.component.html',
  styleUrls: ['./periodPopup.component.scss']
})
export class PeriodPopup implements AfterViewInit {
  name = "";
  description = "";

  can_edit = false;
  timeline_id: any;
  project_id: any;

  @Input() data: any;
  @ViewChild('colorDivs') colorDivsRef!: ElementRef;
  @Output() hide = new EventEmitter();
  quit() {this.hide.emit()}

  constructor(
    private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngAfterViewInit() {
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.timeline_id = paramMap.get('tid'); 
      this.project_id = paramMap.get('pid');
    });

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

  edit(action: string) {
    if (action == "edit") {
      this.can_edit = true;
    }
    else {
      this.can_edit = false;
    }
    if (action == "save") {
      let obs = this.http.put(`/api/timeline/${this.timeline_id}/periods`, {},this.auth.get_header());
      obs.subscribe();
    }
    else if (action == "cancel") {
    }
  }
}
