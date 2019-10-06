import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {

  public id: number;
  public league: any[] = [];
  public teams: any[] = [];
  public displayedColumns: string[] = [
    'idTeam',
    'strTeam',
    'strStadium',
    'intStadiumCapacity'
  ];
  private leagueUrl = 'https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=';
  private teamsUrl = 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=';

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
  }

  fetchLeague(): Observable<any> {
    return this.http.get(this.leagueUrl += this.id);
  }

  fetchTeams(): Observable<any> {
    return this.http.get(this.teamsUrl += this.id);
  }

}
