import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public id: number;
  public team: any[] = [];
  public players: any[] = [];
  public displayedColumns: string[] = [
    'idPlayer',
    'strPlayer',
    'strPosition',
    'dateBorn'
  ];
  private teamUrl = 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=';
  private playersUrl = 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=';

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
      this.players = data.player;
    });
  }

  fetchTeam(): Observable<any> {
    return this.http.get(this.teamUrl += this.id);
  }

  fetchPlayers(): Observable<any> {
    return this.http.get(this.playersUrl += this.id);
  }

}
