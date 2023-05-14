import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'project-small',
  styleUrls: ['./projectSmall.component.scss'],
  host: {
    "(click)": "onClick()"
  },

  template: '<div class="projectText"><div #name class="projectName"></div><div #description class="projectDesc"></div></div><div #image class="projectImage"></div>'
})

export class ProjectSmall { 
  constructor(private router: Router) {}

  @Input() project_id!: string; data_name!: string; data_description!: string; url_image!: string;

  @ViewChild("name") name!: ElementRef;
  @ViewChild("description") description!: ElementRef;
  @ViewChild("image") image!: ElementRef;

  ngAfterViewInit() {
    this.name.nativeElement.innerHTML = this.data_name;
    this.description.nativeElement.innerHTML = this.data_description;
    this.image.nativeElement.style.backgroudImage = `url('${this.url_image}')`
  }

  onClick() {
    this.router.navigate([`/p/${this.project_id}`])
 }
}
