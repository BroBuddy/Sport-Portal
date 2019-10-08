import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html'
})
export class TeamDetailComponent implements OnInit {

  public id: number;
  public team: any = null;
  public events: any = null;
  public displayedColumns: string[] = [
    'strCutout',
    'strPlayer',
    'strPosition',
    'dateBorn'
  ];
  public dataSource: any;
  private teamUrl = environment.apiUrl + '/lookupteam.php?id=';
  private playersUrl = environment.apiUrl + '/lookup_all_players.php?id=';
  private eventsUrl = environment.apiUrl + '/eventslast.php?id=';

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

    this.fetchTeam().subscribe((data: any) => {
      this.team = data.teams[0];
    });

    this.fetchPlayers().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data.player);
      this.dataSource.sort = this.sort;
    });

    this.fetchEvents().subscribe((data: any) => {
      this.events = data.results;
    });
  }

  fetchTeam(): Observable<any> {
    return this.http.get(this.teamUrl += this.id);
  }

  fetchPlayers(): Observable<any> {
    return this.http.get(this.playersUrl += this.id);
  }

  fetchEvents(): Observable<any> {
    return this.http.get(this.eventsUrl += this.id);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
