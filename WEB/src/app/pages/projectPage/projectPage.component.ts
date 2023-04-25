import { HttpClient, HttpParams } from '@angular/common/http';
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

  title_holder: string | undefined;
  description_holder: string | undefined;
  text_holder: string | undefined;

  markdownDesc: string | undefined;
  markdownText: string | undefined;

  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private http: HttpClient, private envinjector: EnvironmentInjector, private applicationRef: ApplicationRef) {}

  @ViewChild('title') title_ref!: ElementRef;
  @ViewChild('owner') owner_ref!: ElementRef;
  @ViewChild('description') description_ref!: ElementRef;
  @ViewChild('text') text_ref!: ElementRef;
  @ViewChild('timelines') timelines_ref!: ElementRef;
  @ViewChild('events') events_ref!: ElementRef;

  exportProject(){
    let proj = this.http.get(`/api/projects/${this.project_id}`);
    let projTimelines;
    proj.subscribe((data: any) => {
      const fileName = `${data.name}.json`
      const file = new Blob([JSON.stringify(data)], {type: 'application/json'})
      const url = window.URL.createObjectURL(file)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  edit(action: string) {
    console.log(action);
    if (action == 'edit') {
      this.title_ref.nativeElement.setAttribute("contenteditable","true");
      this.title_ref.nativeElement.addEventListener("keydown", function(event: any) {if (event.key === "Enter") {event.preventDefault();}});
      this.description_ref.nativeElement.setAttribute("contenteditable","true");
      this.text_ref.nativeElement.setAttribute("contenteditable","true");

      this.title_holder = this.title_ref.nativeElement.innerHTML;
      this.description_holder = this.markdownDesc;
      this.text_holder = this.markdownText;
    } else {
      this.title_ref.nativeElement.setAttribute("contenteditable","false");
      this.description_ref.nativeElement.setAttribute("contenteditable","false");
      this.text_ref.nativeElement.setAttribute("contenteditable","false");
    }
    if (action == 'cancel') {
      this.title_ref.nativeElement.innerHTML = this.title_holder;
      this.description_ref.nativeElement.innerHTM = this.description_holder;
      this.text_ref.nativeElement.innerHTM = this.text_holder;
    } else if (action == 'save') {
      const req_params = new HttpParams().set('n', this.title_ref.nativeElement.innerHTML)
      .set('d', this.description_ref.nativeElement.innerHTML)
      .set('text', this.text_ref.nativeElement.innerHTML);
      this.http.put(`/api/projects/${this.project_id}`, {params: req_params});
    }
    
  }

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
