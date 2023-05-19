import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'project-small',
  styleUrls: ['./projectSmall.component.scss'],
  host: {
    "(click)": "onClick()"
  },

  template: '<div class="projectText"><div class="projectName">{{ name_text }}</div><div class="projectDesc">{{ description_text }}</div></div><img [src]="url_image" class="projectImage">'
})

export class ProjectSmall { 
  constructor(private router: Router) {}

  @Input() project_id!: string;
  @Input() name_text!: string;
  @Input() description_text!: string;
  @Input() url_image!: string;

  onClick() {
    this.router.navigate([`/p/${this.project_id}`])
 }
}
