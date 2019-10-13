import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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
  public selectedCountry: string;
  public leagues$: Observable<any>;
  private apiUrl = environment.apiUrl + '/search_all_leagues.php?s=';

  constructor(public store: StoreService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.apiUrl += this.store.league.strSport;

    this.leagues$ = this.fetchLeagues();
  }

  fetchLeagues(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        map(res => res['countrys']),
        shareReplay(1)
      );
  }

  selectCountry(country: any): void {
    this.selectedCountry = country;
    this.store.selectCountry(country);
  }

  selectLeague(league: any): void {
    this.router.navigate(['/league/' + league.idLeague]);
  }

}
