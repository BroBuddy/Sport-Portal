import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreService } from '../shared/services/store.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styles: ['mat-tab-label { background-color: red; }']
})
export class LeagueComponent implements OnInit {

  public displayedColumns: string[] = [
    'strBadge',
    'strLeague',
    'strCountry',
    'strLeagueAlternate',
    'intFormedYear'
  ];
  public leagues$: Observable<any>;
  private apiUrl = environment.apiUrl + '/search_all_leagues.php?s=';

  constructor(public store: StoreService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.apiUrl += this.store.league.strSport;

    this.fetchLeagues();
  }

  fetchLeagues(): void {
    this.leagues$ = this.http.get(this.apiUrl)
      .pipe(
        map(res => res['countrys'])
      );
  }

  selectCountry(country: any): void {
    this.store.selectCountry(country);
    this.router.navigate(['/league/' + country.idLeague]);
  }

}
