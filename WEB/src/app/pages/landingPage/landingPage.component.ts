import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ElementRef, EnvironmentInjector, Renderer2, ViewChild, createComponent } from '@angular/core';

import { ProjectSmall } from './projectSmall/projectSmall.component';
import { ProjectImport } from './projectImport/projectImport.component';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.scss']
})

export class LandingPage {
  constructor(
    private http: HttpClient,
    private envinjector: EnvironmentInjector,
    private applicationRef: ApplicationRef,
    private auth: AuthService,
    private renderer: Renderer2
    ) {}

  @ViewChild("projects") projects!: ElementRef;
  @ViewChild("addProject") add_ref!: ElementRef;
  @ViewChild("projectImport") import_ref!: ElementRef;

  load(querry: string, is_auth: boolean) {
    while (this.projects.nativeElement.children.length > 1) {
      this.renderer.removeChild(this.projects.nativeElement, this.projects.nativeElement.firstChild);
    }
    let obs: any;
    if (is_auth) {
      //load only personal projects
      obs = this.http.get(querry, this.auth.httpHeader );
    } else {
      //load public project
      obs = this.http.get(querry);
      this.add_ref.nativeElement.style.display = "none";
    }
    obs.subscribe((obs_data: any) => {
      let projects_ids = Object.keys(obs_data);

      //generate project components
      for (let i = 0; i < projects_ids.length; i++) {

        //create host container
        const tmp = this.renderer.createElement('div');
        this.renderer.appendChild(this.projects.nativeElement, tmp);

        //create project small instance
        let elem = createComponent(ProjectSmall, {
          environmentInjector: this.envinjector,
          hostElement: tmp
        })
        //set elem inputs
        elem.instance.data_name = obs_data[projects_ids[i]].name;
        elem.instance.data_description = obs_data[projects_ids[i]].description;
        elem.instance.project_id = projects_ids[i];

        //add elem to view
        this.applicationRef.attachView(elem.hostView);

        //keep addbutton to the bottom
        let tmp2 = this.projects.nativeElement.children[this.projects.nativeElement.children.length - 2];
        this.projects.nativeElement.appendChild(tmp2);
      }
    })
  }

  ngAfterViewInit() {
    if (this.auth.isUserLoggedIn) {
      this.load('/api/user_projects',true)
    } else {
      this.load('/api/projects',false)
    }
  }
  
  onSearchSubmit(event: any, searchValue: string) {
    if (this.auth.isUserLoggedIn) {
      if ((event.keyCode === 13 || event.key === 'Enter') && searchValue.trim() !== '') {
        let i = searchValue;
        this.load(`/api/user_projects/?search=${i}`,true);
      }
    }
    else {
      if ((event.keyCode === 13 || event.key === 'Enter') && searchValue.trim() !== '') {
        let i = searchValue;
        this.load(`/api/projects/?search=${i}`,false);
      }
    }
  }

  onSearchInputChange(event: any) {
    if (event.target.value.trim() === '') {
      this.ngAfterViewInit();
    }
  }
}