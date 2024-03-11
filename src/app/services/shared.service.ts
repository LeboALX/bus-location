import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  pieSubject = new Subject<any>();
  pieRefresh: boolean = false;
  constructor() { }

  refreshPie(): void {
    this.pieRefresh = true;
    this.pieSubject.next(this.pieRefresh)
  }

  watchPieUpdates(): Observable<any> {
    return this.pieSubject.asObservable();
  }
}
