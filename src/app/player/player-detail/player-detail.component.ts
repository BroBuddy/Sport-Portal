import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {

  public id: number;
  public player: any[] = [];
  public honors: any[] = [];
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

    this.fetchPlayer().subscribe((data: any) => {
      this.player = data.players[0];
    });

    this.fetchHonors().subscribe((data: any) => {
      this.honors = data.honors;
    });
  }

  fetchPlayer(): Observable<any> {
    return this.http.get(this.playerUrl += this.id);
  }

  fetchHonors(): Observable<any> {
    return this.http.get(this.honorsUrl += this.id);
  }

}
