import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ElementRef, EnvironmentInjector, ViewChild, createComponent } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ProjectSmall } from './projectSmall/projectSmall.component';

@Component({
  selector: 'landing-page',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.scss']
})

export class LandingPage {
  constructor(private router: Router, private http: HttpClient, private envinjector: EnvironmentInjector, private applicationRef: ApplicationRef) {}

  @ViewChild("projects") projects!: ElementRef;

  async ngOnInit() {
    //routing
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // remove this component from the DOM
        document.querySelectorAll('[rel$="-page"]').forEach(item => {
          let tag = false;
          if (item.tagName != 'landing-page' || tag) {
            item.parentNode?.removeChild(item);
          } else {
            tag = true;
          }
        });
      });

    //loading public projects
    let obs = this.http.get('/api/projects/');

    obs.subscribe(
      (data: any) => {
        let projects_data = JSON.parse(data);
        let projects_ids = projects_data.keys();

        for (let i = 0; i < projects_ids.length; i++) {
          //create project small instance
          let elem = createComponent(ProjectSmall, {
            environmentInjector: this.envinjector,
            hostElement: this.projects.nativeElement
          })
          //set elem inputs
          elem.instance.name = projects_data[projects_ids[i]].name;
          elem.instance.description = projects_data[projects_ids[i]].description;
          //add elem to view
          this.applicationRef.attachView(elem.hostView);
        }
      }
    )
  }
}
