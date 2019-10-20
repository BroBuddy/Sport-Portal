import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    this.data$ = this.http.get(url)
      .pipe(
        map(res => Object.values(res)[0])
      );

    this.category = category;
    this.dataReady = true;
  }
}
