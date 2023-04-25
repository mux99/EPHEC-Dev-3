import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'project-event',
  styleUrls: ['./projectEvent.component.scss'],

  template: '<h2 #title>event name</h2><p #descriptionp>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis quis purus ac volutpat. In lectus velit, lacinia vitae felis eget, tristique vehicula lacus.</p>'
})

export class ProjectEvent {

  @ViewChild('title') title_ref!: ElementRef;
  @ViewChild('description') description_ref!: ElementRef;
  @Input() event!: any;

  ngOnInit() {
    this.title_ref.nativeElement.innerHTML = this.event.title;
    this.description_ref.nativeElement.innerHTML = this.event.description;
  }
}
