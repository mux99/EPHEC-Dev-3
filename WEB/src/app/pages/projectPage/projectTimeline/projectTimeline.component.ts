import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'project-timeline',
  styleUrls: ['./projectTimeline.component.scss'],
  host: {'class': 'hoverable'},

  template: '<span>{{ name }}</span><div id="button"><button class="timelineDelete" (click)="delete()">delete</button></div><div id="box" (click)="click()" #box></div><p>{{ description }}</p>'
})

export class ProjectTimeline {
  name = "";
  description = "";

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ){}

  @Input() timeline_id!: string;
  @Input() project_id!: string;

  @ViewChild("description") description_ref!: ElementRef;
  @ViewChild("box") box_ref!: ElementRef; 

  ngAfterViewInit() {
    let obs = this.http.get(`/api/projects/${this.project_id}/timelines/${this.timeline_id}`, this.auth.get_header());
    obs.subscribe((obs_data: any) => {
      this.name = obs_data.name;
      this.description = obs_data.description;
    });
  }

  click() {
    this.router.navigate([`/p/${this.project_id}/t/${this.timeline_id}`])
  }

  delete() {
    let obs = this.http.delete(`/api/timelines/${this.timeline_id}`, this.auth.get_header());
    obs.subscribe();
  }
}
