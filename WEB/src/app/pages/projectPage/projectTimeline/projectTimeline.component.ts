import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'project-timeline',
  styleUrls: ['./projectTimeline.component.scss'],

  template: '<span #name></span><div (click)="click()"></div><p #description></p>'
})

export class ProjectTimeline {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ){}

  @Input() timeline_id!: string; project_id!: string;

  @ViewChild("name") name_ref!: ElementRef;
  @ViewChild("description") description_ref!: ElementRef;

  ngAfterViewInit() {
    let obs = this.http.get(`/api/projects/${this.project_id}/timelines/${this.timeline_id}`, this.auth.isUserLoggedIn ? this.auth.httpHeader : null);
    obs.subscribe((obs_data: any) => {
      this.name_ref.nativeElement.innerHTML = obs_data.name;
      this.description_ref.nativeElement.innerHTML = obs_data.description;
    })
  }

  click() {
    this.router.navigate([`/p/${this.project_id}/t/${this.timeline_id}`])
  }
}
