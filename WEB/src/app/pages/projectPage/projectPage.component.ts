import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ElementRef, EnvironmentInjector, ViewChild, createComponent } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProjectEvent } from './projectEvent/projectEvent.component';
import { ProjectTimeline } from './projectTimeline/projectTimeline.component';

@Component({
  selector: 'project-page',
  templateUrl: './projectPage.component.html',
  styleUrls: ['./projectPage.component.scss']
})

export class ProjectPage {
  project_id: any;

  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private http: HttpClient, private envinjector: EnvironmentInjector, private applicationRef: ApplicationRef) {}

  @ViewChild('title') title_ref!: ElementRef;
  @ViewChild('owner') owner_ref!: ElementRef;
  @ViewChild('description') description_ref!: ElementRef;
  @ViewChild('text') text_ref!: ElementRef;
  @ViewChild('timelines') timelines_ref!: ElementRef;
  @ViewChild('events') events_ref!: ElementRef;

  ngOnInit() {
    //fetch id from url
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.project_id = paramMap.get('id'); 
    });

    //remove old pages from dom
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // remove this component from the DOM
        document.querySelectorAll('[rel$="-page"]').forEach(item => {
          let tag = false;
          if (item.tagName != 'project-page' || tag) {
            item.parentNode?.removeChild(item);
          } else {
            tag = true;
          }
        });
      });
    
    //querry project data from api
    let obs = this.http.get(`/api/projects/${this.project_id}`);
    obs.subscribe(
      (data: any) => {
        //load project data
        this.title_ref.nativeElement.innerHTML = data.name;
        this.owner_ref.nativeElement.innerHTML = data.owner_name;
        this.description_ref.nativeElement.innerHTML = data.description;
        this.text_ref.nativeElement.innerHTML = data.text;

        //load events
        for (let i = 0; i < data.events; i++) {
          //create event instance
          let elem = createComponent(ProjectEvent, {
            environmentInjector: this.envinjector,
            hostElement: this.events_ref.nativeElement
          })
          //set elem inputs


          //add elem to view
          this.applicationRef.attachView(elem.hostView);
        }
      }
    )
  }
}
