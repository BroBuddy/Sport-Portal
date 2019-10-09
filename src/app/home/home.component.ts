import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StoreService } from '../shared/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public sportsList: any[] = [];
  private apiUrl = environment.apiUrl + '/all_sports.php';

  constructor(private http: HttpClient,
              private store: StoreService) { }

  ngOnInit(): void {
    this.fetchData().subscribe((data: any) => {
      this.sportsList = data.sports;
    });
  }

  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  selectLeague(sport: any): void {
    this.store.selectCountry(null);
    this.store.selectLeague(sport);
  }

}
