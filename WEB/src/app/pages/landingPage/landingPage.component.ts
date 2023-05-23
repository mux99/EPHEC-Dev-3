import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.scss']
})

export class LandingPage {
  is_public = true;
  projects_list: any[] = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService
    ) {}

  @ViewChild("projects") projects_ref!: ElementRef;

  ngAfterViewInit() {
    this.is_public = this.auth.isUserLoggedIn
    this.load()
  }

  load(search: string = "") {
    let tmp = search != "" ? "?search="+search : "";
    let obs = this.http.get(this.is_public ? `/api/projects${tmp}` : `/api/user_projects${tmp}`, this.auth.get_header() );
    obs.subscribe((obs_data: any) => {this.projects_list = obs_data})
  }

  goToMine() {
    this.is_public = !this.is_public;
    this.load()
  }

  canGoMine() {
    return this.is_public && this.auth.isUserLoggedIn
  }

  goToPublic() {
    this.is_public = !this.is_public;
    this.load();
  }
  
  onSearchSubmit(event: any, searchValue: string) {
    if ((event.keyCode === 13 || event.key === 'Enter') && searchValue.trim() !== '') {
      this.load(searchValue);
    }
  }
}