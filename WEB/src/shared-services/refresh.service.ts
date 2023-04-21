import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private shouldBeRefreshed = new BehaviorSubject(true);
  shouldBeRefreshed$ = this.shouldBeRefreshed.asObservable();

  constructor() { }

  refresh(username: string, tag: string) {
    this.shouldBeRefreshed.next(true);
  }    
}
