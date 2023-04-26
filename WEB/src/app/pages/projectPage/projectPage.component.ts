import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ElementRef, EnvironmentInjector, Renderer2, ViewChild, createComponent } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';
import { SliderButton } from 'src/app/components/sliderButton/sliderButton.component';
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

  constructor(
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private envinjector: EnvironmentInjector,
    private applicationRef: ApplicationRef,
    private http: HttpClient,
    private auth: AuthService,
    private renderer: Renderer2
  ) {}

  @ViewChild('title') title_ref!: ElementRef;
  @ViewChild('owner') owner_ref!: ElementRef;
  @ViewChild('description') description_ref!: ElementRef;
  @ViewChild('text') text_ref!: ElementRef;
  @ViewChild('timelines') timelines_ref!: ElementRef;
  @ViewChild('events') events_ref!: ElementRef;
  @ViewChild(SliderButton) sliderButton!:SliderButton;

  exportProject(){
    let proj = this.http.get(`/api/projects/${this.project_id}`);
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
    if (action == 'save') {
      let n = this.title_ref.nativeElement.innerHTML.trim()
      let d = this.description_ref.nativeElement.innerHTML.trim()
      let t = this.text_ref.nativeElement.innerHTML.trim()
      let obs = this.http.put(`/api/projects/${this.project_id}/?n=${n}&d=${d}&t=${t}`, {},this.auth.httpHeader);
      obs.subscribe(
        (obs_data: any) => {
          console.log(obs_data);
        }
      );
    }
    if (action == 'edit') {
      this.title_ref.nativeElement.setAttribute("contenteditable","true");
      this.title_ref.nativeElement.addEventListener("keydown", function(event: any) {if (event.key === "Enter") {event.preventDefault();}});
      this.description_ref.nativeElement.setAttribute("contenteditable","true");
      this.text_ref.nativeElement.setAttribute("contenteditable","true");

      this.title_holder = this.title_ref.nativeElement.innerHTML;
      this.description_holder = this.markdownDesc;
      this.text_holder = this.markdownText;
    }
    else {
      this.title_ref.nativeElement.setAttribute("contenteditable","false");
      this.description_ref.nativeElement.setAttribute("contenteditable","false");
      this.text_ref.nativeElement.setAttribute("contenteditable","false");
    }
    if (action == 'cancel') {
      this.title_ref.nativeElement.innerHTML = this.title_holder;
      this.description_ref.nativeElement.innerHTM = this.description_holder;
      this.text_ref.nativeElement.innerHTM = this.text_holder;
    }
  }

  clickDelete() {
    let obs = this.http.delete(`/api/projects/${this.project_id}`, this.auth.httpHeader);
    obs.subscribe(
      (obs_data: any) => {
        this.router.navigate(['/'])
      }
    );
  }

  clickPublic(event: string) {
    let obs = this.http.put(`/api/projects/${this.project_id}/?v=${event}`, this.auth.httpHeader);
    obs.subscribe();
  }

  ngOnInit() {
    //fetch id from url
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.project_id = paramMap.get('id'); 
    });
  }

  ngAfterViewInit() {
    //querry project data from api
    let obs = this.http.get(`/api/projects/${this.project_id}`, this.auth.httpHeader);
    obs.subscribe(
      (obs_data: any) => {
        //load project data
        this.title_ref.nativeElement.innerHTML = obs_data.name;
        this.owner_ref.nativeElement.innerHTML = obs_data.owner;
        this.description_ref.nativeElement.innerHTML = obs_data.description;
        this.text_ref.nativeElement.innerHTML = obs_data.text;
        this.sliderButton.setState(obs_data.visibility);
        console.log(obs_data.timelines);
        //load timelines instances
        for (let i = 0; i < obs_data.timelines.length; i++) {
          const tmp = this.renderer.createElement('div');
          this.renderer.appendChild(this.timelines_ref.nativeElement, tmp);
          let elem = createComponent(ProjectTimeline, {
            environmentInjector: this.envinjector,
            hostElement: tmp
          })
          elem.instance.timeline_id = obs_data.timelines[i];
          elem.instance.project_id = this.project_id;
          this.applicationRef.attachView(elem.hostView);
          let tmp2 = this.timelines_ref.nativeElement.children[this.timelines_ref.nativeElement.children.length - 2];
          this.timelines_ref.nativeElement.appendChild(tmp2);
        }
      }
    )
  }
}
