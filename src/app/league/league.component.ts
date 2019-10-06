import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { StoreService } from '../shared/services/store.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  public displayedColumns: string[] = [
    'idLeague',
    'strCountry',
    'strLeague',
    'strLeagueAlternate',
    'intFormedYear',
    'strWebsite'
  ];
  public leaguesList: any[] = [];
  private apiUrl = 'https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?s=';

  constructor(private http: HttpClient,
              private store: StoreService) { }

  ngOnInit(): void {
    this.apiUrl += this.store.sport.strSport;

    this.fetchData().subscribe((data: any) => {
      this.leaguesList = data.countrys;
    });
  }

  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
