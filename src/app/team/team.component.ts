import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { StoreService } from '../shared/services/store.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {

  public displayedColumns: string[] = [
    'strTeam',
    'strStadium',
    'intStadiumCapacity',
    'intFormedYear',
    'strWebsite'
  ];
  public teamsList: any[] = [];
  private apiUrl = environment.apiUrl + '/search_all_teams.php?s=';

  constructor(public store: StoreService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.apiUrl += this.store.league.strSport + '&c=' + this.store.country.strCountry;

    this.fetchData().subscribe((data: any) => {
      this.teamsList = data.teams;
    });
  }

  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
