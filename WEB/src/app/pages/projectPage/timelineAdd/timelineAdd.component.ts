import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'timeline-add',
  styleUrls: ['./timelineAdd.component.scss'],
  host: {
    "class": "placeholder",
    "id": "timelineAdd"
  },
  template: '<div><span>add timeline</span><button class="add_button" (click)="onClick()"></button></div>'
})

export class TimelineAdd {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
    ) { }
  
  @Input() project_id!: string; 

  onClick() {
    let obs = this.http.post(`/api/projects/${this.project_id}/timelines/`, {}, this.auth.get_header() );
    obs.subscribe((obs_data: any) => {this.router.navigate([`/p/${this.project_id}/t/${obs_data.id}`])});
  }
}
