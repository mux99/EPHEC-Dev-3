import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';
import { SliderButton } from 'src/app/components/sliderButton/sliderButton.component';

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
    private http: HttpClient,
    private auth: AuthService
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
    else if (action == 'save') {
      const req_params = new HttpParams().set('n', this.title_ref.nativeElement.innerHTML)
      .set('d', this.description_ref.nativeElement.innerHTML)
      .set('text', this.text_ref.nativeElement.innerHTML);
      this.http.put(`/api/projects/${this.project_id}`, {params: req_params});
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
        console.log(obs_data)
        //load project data
        this.title_ref.nativeElement.innerHTML = obs_data.name;
        this.owner_ref.nativeElement.innerHTML = obs_data.owner_name;
        this.description_ref.nativeElement.innerHTML = obs_data.description;
        this.text_ref.nativeElement.innerHTML = obs_data.text;
        this.sliderButton.setState(obs_data.visibility);
      }
    )
  }
}
