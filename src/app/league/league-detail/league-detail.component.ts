import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html'
})
export class LeagueDetailComponent implements OnInit {

  public id: number;
  public league: any[] = [];
  public seasons: any[] = [];
  public displayedColumns: string[] = [
    'strTeam',
    'strStadium',
    'intStadiumCapacity'
  ];
  public dataSource: any;
  private leagueUrl = environment.apiUrl + '/lookupleague.php?id=';
  private teamsUrl = environment.apiUrl + '/lookup_all_teams.php?id=';
  private seasonsUrl = environment.apiUrl + '/search_all_seasons.php?id=';

  @ViewChild(MatSort, {static: true}) sort: MatSort;

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
      this.dataSource = new MatTableDataSource(data.teams);
      this.dataSource.sort = this.sort;
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

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
