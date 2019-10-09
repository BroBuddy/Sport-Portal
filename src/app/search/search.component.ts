import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  public myControl = new FormControl();
  public options: any[] = [];
  public filteredOptions: Observable<string[]>;
  public searchToggle = new FormControl();
  private searchTeamsUrl = environment.apiUrl + '/searchteams.php?t=';
  private searchPlayersUrl = environment.apiUrl + '/searchplayers.php?p=';

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  triggerSearch(input: string, type?: string): void {
    const url = this.searchToggle.value ? this.searchPlayersUrl : this.searchTeamsUrl;

    if (input.length >= 3) {
      this.fetchSearchTeams(url + input).subscribe((data: any) => {
        this.options = [];
  
        const items = type === 'player' ? data.player : data.teams;
  
        items.forEach(item => {
          const element = {
            id: type === 'player' ? item.idPlayer : item.idTeam,
            name: type === 'player' ? item.strPlayer : item.strTeam,
            sport: item.strSport,
            logo: item.strTeamBadge
          };
  
          this.options.push(element);
        });
      });
    } else {
      this.options = [];
    }
  }

  fetchSearchTeams(input: string): Observable<any> {
    return this.http.get(input);
  }

  enterSearch(event: any, type?: string): void {
    this.selectOption(event.target.value, type);
  }

  selectOption(id: number, type?: string): void {
    const folder = type === 'player' ? 'player' : 'team';
    this.router.navigate(['/' + folder + '/' + id]);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
