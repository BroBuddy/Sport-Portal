import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public data$: Observable<any>;
  public dataReady: boolean;
  public category: string;

  constructor(private http: HttpClient) { }

  fetchSearch(url: string, category: string): void {
    this.dataReady = false;
    this.category = null;

    switch (category) {
      case 'teams':
        this.data$ = this.http.get(url)
          .pipe(
            map(res => res.teams)
          );
        break;
      case 'players':
        this.data$ = this.http.get(url)
          .pipe(
            map(res => res.player)
          );
        break;
      case 'events':
        this.data$ = this.http.get(url)
          .pipe(
            map(res => res.event)
          );
        break;
    }

    this.category = category;
    this.dataReady = true;
  }
}
