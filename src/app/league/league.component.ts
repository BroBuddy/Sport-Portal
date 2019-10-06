import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { StoreService } from '../shared/services/store.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html'
})
export class LeagueComponent implements OnInit {

  public displayedColumns: string[] = [
    'strLeague',
    'strCountry',
    'strLeagueAlternate',
    'intFormedYear',
    'strWebsite'
  ];
  public leaguesList: any[] = [];
  private apiUrl = environment.apiUrl + '/search_all_leagues.php?s=';

  constructor(private http: HttpClient,
              private store: StoreService) { }

  ngOnInit(): void {
    this.apiUrl += this.store.league.strSport;

    this.fetchData().subscribe((data: any) => {
      this.leaguesList = data.countrys;
    });
  }

  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  selectCountry(country: any): void {
    this.store.selectCountry(country);
  }

}
