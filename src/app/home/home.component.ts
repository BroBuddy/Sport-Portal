import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StoreService } from '../shared/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public sportsList: any[] = [];
  public myControl = new FormControl();
  public options: any[] = [];
  public filteredOptions: Observable<string[]>;
  public searchToggle = new FormControl();
  private apiUrl = environment.apiUrl + '/all_sports.php';
  private searchTeamsUrl = environment.apiUrl + '/searchteams.php?t=';
  private searchPlayersUrl = environment.apiUrl + '/searchplayers.php?p=';

  constructor(private http: HttpClient,
              private store: StoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchData().subscribe((data: any) => {
      this.sportsList = data.sports;
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  triggerSearchTeam(input: string): void {
    const url = this.searchToggle.value ? this.searchPlayersUrl : this.searchTeamsUrl;

    this.fetchSearchTeams(url + input).subscribe((data: any) => {
      this.options = [];

      const items = this.searchToggle.value ? data.player : data.teams;

      items.forEach(item => {
        const element = {
          id: this.searchToggle.value ? item.idPlayer : item.idTeam,
          name: this.searchToggle.value ? item.strPlayer : item.strTeam
        };

        this.options.push(element);
      });

      console.log('-', this.options);
    });
  }

  selectTeam(id: number): void {
    const folder = this.searchToggle.value ? 'player' : 'team';
    this.router.navigate(['/' + folder + '/' + id]);
  }

  enterTeam(event: any): void {
    this.selectTeam(event.target.value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  fetchSearchTeams(input: string): Observable<any> {
    return this.http.get(input);
  }

  selectLeague(sport: any): void {
    this.store.selectCountry(null);
    this.store.selectLeague(sport);
  }

}
