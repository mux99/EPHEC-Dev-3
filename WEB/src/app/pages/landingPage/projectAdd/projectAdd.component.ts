import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'project-add',
  styleUrls: ['./projectAdd.component.scss'],
  host: {
    "id": "addProject"
  },
  template: '<button (click)="onClick()" class="bubble"><img src="/assets/plusIcon.svg"></button>'
})

export class ProjectAdd {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  onClick() {
    let obs = this.http.post('/api/projects/', {}, this.auth.httpHeader );
    obs.subscribe(
      (obs_data: any) => {
        this.router.navigate([`/p/${obs_data.id}`])
      }
    )
  }
}
