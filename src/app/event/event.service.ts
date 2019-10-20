import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public data$: Observable<any>;
  public dataReady: boolean;

  constructor(private http: HttpClient) { }

  fetchData(url: string): void {
    this.dataReady = false;

    this.data$ = this.http.get(url)
      .pipe(
        map(res => Object.values(res)[0])
      );

    this.dataReady = true;
  }

}
