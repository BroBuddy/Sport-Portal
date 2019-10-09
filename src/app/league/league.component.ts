import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreService } from '../shared/services/store.service';
import { environment } from '../../environments/environment';

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
  public dataSource: any;
  public leagues$: Observable<any>;
  private apiUrl = environment.apiUrl + '/search_all_leagues.php?s=';

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public store: StoreService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.apiUrl += this.store.league.strSport;

    this.fetchLeagues();

    this.fetchData().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data.countrys);
      this.dataSource.sort = this.sort;
    });
  }

  fetchLeagues(): void {
    this.leagues$ = this.http.get(this.apiUrl)
      .pipe(
        map(res => res['countrys'])
      );
  }

  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  selectCountry(country: any): void {
    this.store.selectCountry(country);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
