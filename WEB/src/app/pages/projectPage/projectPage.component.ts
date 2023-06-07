import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'project-page',
  templateUrl: './projectPage.component.html',
  styleUrls: ['./projectPage.component.scss']
})

export class ProjectPage {
  project_id: any;
  can_edit: boolean;
  editing = false;
  tmp: any[] = [];
  name_var = "";
  name_holder = "";
  owner_var = "";
  description_var = "";
  description_holder = "";
  text_var = "";
  text_holder = "";
  tag_var = ""
  timelines = this.tmp;
  events = this.tmp;
  visibility = false;

  constructor(
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.can_edit = false;
  }

  @ViewChild('visibilityToggle') visToggle!: ElementRef;

  ngOnInit() {
    //fetch id from url
    this._Activatedroute.paramMap.subscribe(paramMap => {
      this.project_id = paramMap.get('id');
    });
  }

  ngAfterViewInit() {
    //querry project data from api
    let obs = this.http.get(`/api/projects/${this.project_id}`, this.auth.get_header());
    obs.subscribe((obs_data: any) => {
      this.name_var = obs_data.name;
      this.owner_var = obs_data.owner;
      this.description_var = obs_data.description;
      this.text_var = obs_data.text;
      this.tag_var = obs_data.tag;
      this.timelines = obs_data.timelines;
      this.events = obs_data.events;
      this.visibility = obs_data.visible;
      this.can_edit = obs_data.can_edit;
    });
  }

  edit(action: string) {
    if (action == 'save') {
      let obs = this.http.put(`/api/projects/${this.project_id}?n=${this.name_var}&d=${this.description_var}&t=${this.text_var}`, this.auth.get_header());
    obs.subscribe();
    }
    if (action == 'cancel') {
      this.name_var = this.name_holder;
      this.description_var = this.description_holder;
      this.text_var = this.text_holder;
    }
    if (action == 'edit') {
      this.editing = true;
      this.name_holder = this.name_var;
      this.description_holder = this.description_var;
      this.text_holder = this.text_var;
    }
    else {
      this.editing = false;
    }
  }

  clickDelete() {
    let obs = this.http.delete(`/api/projects/${this.project_id}`, this.auth.get_header());
    obs.subscribe((_: any) => {this.router.navigate(['/'])});
  }

  clickPublic() {
    let obs = this.http.put(`/api/projects/${this.project_id}?v=${!this.visibility}`,{} , this.auth.get_header());
    obs.subscribe();
  }

  clickImage() {
    let imgLink = window.prompt('Enter image link:');
    if(imgLink == null) return;
    let obs = this.http.put(`/api/projects/${this.project_id}?i=${imgLink}`,{} , this.auth.get_header());
    obs.subscribe();
  }
}
