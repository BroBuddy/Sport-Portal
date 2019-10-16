import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map, shareReplay, toArray } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html'
})
export class TeamDetailComponent implements OnInit {

  public id: number;
  public team$: Observable<any>;
  public events$: Observable<any>;
  public displayedColumns: string[] = [
    'strCutout',
    'strPlayer',
    'strPosition',
    'dateBorn'
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
          this.team$ = this.fetchTeam();
          this.events$ = this.fetchEvents();

          this.fetchPlayers().subscribe((data: any) => {
            this.dataSource = new MatTableDataSource(data.player);
            this.dataSource.sort = this.sort;
          });
        }
      );
  }

  fetchTeam(): Observable<any> {
    return this.http.get(environment.apiUrl + '/lookupteam.php?id=' + this.id)
      .pipe(
        map((res) => res['teams'][0]),
        toArray()
      );
  }

  fetchEvents(): Observable<any> {
    return this.http.get(environment.apiUrl + '/eventslast.php?id=' + this.id)
      .pipe(
        map((res) => res['results']),
        shareReplay(1)
      );
  }

  fetchPlayers(): Observable<any> {
    return this.http.get(environment.apiUrl + '/lookup_all_players.php?id=' + this.id);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  trackByFn(index): number {
    return index;
  }

}
