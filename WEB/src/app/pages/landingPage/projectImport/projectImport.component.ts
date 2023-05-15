import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'project-import',
    styleUrls: ['./projectImport.component.scss'],
    host: {
        "id": "importProject"
    },
    template: '<button #importProject (click)="filePicker.click()" class="bubble"><img src="/assets/importIcon.svg"></button><input hidden (change)="onFileSelected()" #filePicker type="file" id="filePicker" accept=".json">'
})

export class ProjectImport{
    constructor(private router: Router){}
    onFileSelected(){
        let fileIn = (document.getElementById("filePicker") as HTMLInputElement).files
        let reader = new FileReader()
        reader.readAsText(fileIn?.item(0) as Blob)
        reader.onloadend = () => {
            this.router.navigate([`/p/import/${reader.result}`])
        }

    }
}