import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, toArray } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {

  public id: number;
  public player$: Observable<any>;
  public honors$: Observable<any>;
  public honorsLength = 0;
  public displayedColumns: string[] = [
    'idTeam',
    'strTeam',
    'strStadium',
    'intStadiumCapacity'
  ];
  private playerUrl = environment.apiUrl + '/lookupplayer.php?id=';
  private honorsUrl = environment.apiUrl + '/lookuphonors.php?id=';

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
    this.player$ = this.http.get(this.playerUrl += this.id)
      .pipe(
        map(res => res['players'][0]),
        toArray()
      );
  }

  fetchHonor(): void {
    this.honors$ = this.http.get(this.honorsUrl += this.id)
      .pipe(
        map((res) => res['honors']),
        tap(res => { this.honorsLength = Object.keys(res).length; })
      );
  }

}
