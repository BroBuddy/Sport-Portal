import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html'
})
export class LeagueDetailComponent implements OnInit {

  public id: number;
  public league: any[] = [];
  public teams: any[] = [];
  public seasons: any[] = [];
  public displayedColumns: string[] = [
    'strTeam',
    'strStadium',
    'intStadiumCapacity'
  ];
  private leagueUrl = environment.apiUrl + '/lookupleague.php?id=';
  private teamsUrl = environment.apiUrl + '/lookup_all_teams.php?id=';
  private seasonsUrl = environment.apiUrl + '/search_all_seasons.php?id=';

  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
        }
      );

    this.fetchLeague().subscribe((data: any) => {
      this.league = data.leagues[0];
    });

    this.fetchTeams().subscribe((data: any) => {
      this.teams = data.teams;
    });

    this.fetchSeasons().subscribe((data: any) => {
      this.seasons = data.seasons;
    });
  }

  fetchLeague(): Observable<any> {
    return this.http.get(this.leagueUrl += this.id);
  }

  fetchTeams(): Observable<any> {
    return this.http.get(this.teamsUrl += this.id);
  }

  fetchSeasons(): Observable<any> {
    return this.http.get(this.seasonsUrl += this.id);
  }

}
