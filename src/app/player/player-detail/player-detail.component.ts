import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, toArray, shareReplay } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {

  public id: number;
  public player$: Observable<any>;
  public honors$: Observable<any>;
  public displayedColumns: string[] = [
    'idTeam',
    'strTeam',
    'strStadium',
    'intStadiumCapacity'
  ];

  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
        }
      );

    this.fetchPlayer();
    this.fetchHonor();
  }

  fetchPlayer(): void {
    this.player$ = this.http.get(environment.apiUrl + '/lookupplayer.php?id=' + this.id)
      .pipe(
        map(res => res['players'][0]),
        shareReplay(1),
        toArray()
      );
  }

  fetchHonor(): void {
    this.honors$ = this.http.get(environment.apiUrl + '/lookuphonors.php?id=' + this.id)
      .pipe(
        map((res) => res['honors']),
        shareReplay(1)
      );
  }

  trackByFn(index): number {
    return index;
  }

}
