import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html'
})
export class TeamDetailComponent implements OnInit {

  public id: number;
  public team: any[] = [];
  public players: any[] = [];
  public events: any[] = [];
  public displayedColumns: string[] = [
    'strPlayer',
    'strPosition',
    'dateBorn'
  ];
  private teamUrl = environment.apiUrl + '/lookupteam.php?id=';
  private playersUrl = environment.apiUrl + '/lookup_all_players.php?id=';
  private eventsUrl = environment.apiUrl + '/eventslast.php?id=';

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

}
