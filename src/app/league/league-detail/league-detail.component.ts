import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html'
})
export class LeagueDetailComponent implements OnInit {

  public id: number;
  public league$: Observable<any>;
  public seasons$: Observable<any>;
  public events$: Observable<any>;
  public displayedColumns: string[] = [
    'strTeamBadge',
    'strTeam',
    'strStadium',
    'intStadiumCapacity'
  ];
  public dataSource: any;

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

    this.league$ = this.fetchLeague();
    this.events$ = this.fetchEvents();
    this.seasons$ = this.fetchSeasons();

    this.fetchTeams().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data.teams);
      this.dataSource.sort = this.sort;
    });
  }

  fetchLeague(): Observable<any> {
    return this.http.get(environment.apiUrl + '/lookupleague.php?id=' + this.id)
      .pipe(
        map(res => res['leagues'][0]),
        toArray()
      );
  }

  fetchEvents(): Observable<any> {
    return this.http.get(environment.apiUrl + '/eventspastleague.php?id=' + this.id)
      .pipe(
        map(res => res['events'])
      );
  }

  fetchSeasons(): Observable<any> {
    return this.http.get(environment.apiUrl + '/search_all_seasons.php?id=' + this.id)
    .pipe(
      map(res => res['seasons'])
    );
  }

  fetchTeams(): Observable<any> {
    return this.http.get(environment.apiUrl + '/lookup_all_teams.php?id=' + this.id);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  trackByFn(index): number {
    return index;
  }

}
