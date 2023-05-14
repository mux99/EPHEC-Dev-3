import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventEdit {
    private tmp = new Subject<any>();
    makeEditable$ = this.tmp.asObservable();

    constructor() { }

    click(data: any) {
        this.tmp.next(data);
    }
}