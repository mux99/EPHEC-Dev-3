import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'timeline-add',
  styleUrls: ['./timelineAdd.component.scss'],
  host: {
    "class": "placeholder",
    "id": "timelineAdd"
  },
  template: '<div><span>add timeline</span><button class="add_button" (click)="onClick()"></button><div>'
})

export class TimelineAdd {
  project_id: any

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private _Activatedroute: ActivatedRoute
    ) { }

  ngOnInit() {
    //fetch id from url
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.project_id = paramMap.get('id'); 
    });
  }

  onClick() {
    let obs = this.http.post(`/api/projects/${this.project_id}/timelines/`, {}, this.auth.httpHeader );
    obs.subscribe(
      (obs_data: any) => {
        this.router.navigate([`/p/${this.project_id}/t/${obs_data.id}`])
      }
    )
  }
}
