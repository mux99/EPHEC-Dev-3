import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'project-small',
  styleUrls: ['./projectSmall.component.scss'],

  template: '<div class="projectText"><div #name class="projectName"></div><div #description class="projectDesc"></div></div><div #image class="projectImage"></div>'
})

export class ProjectSmall { 
  @Input() uid!: string; data_name!: string; data_description!: string; url_image!: string;

  @ViewChild("name") name!: ElementRef;
  @ViewChild("description") description!: ElementRef;
  @ViewChild("image") image!: ElementRef;

  ngOnInit() {
    this.name.nativeElement.innerHTML = this.data_name;
    this.description.nativeElement.innerHTML = this.data_description;
    this.image.nativeElement.style.backgroudImage = `url('${this.url_image}')`
  }
}
