import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ElementRef, EnvironmentInjector, Renderer2, ViewChild, createComponent } from '@angular/core';

import { ProjectSmall } from './projectSmall/projectSmall.component';
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

  ngAfterViewInit() {
    let obs: any;
    if (this.auth.isUserLoggedIn) {
      //load only personal projects
      obs = this.http.get('/api/user_projects', this.auth.httpHeader );
    } else {
      //load public project
      obs = this.http.get('/api/projects/');
    }
    obs.subscribe(
      (obs_data: any) => {
        console.log(obs_data);
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
      }
    )
  }
}
