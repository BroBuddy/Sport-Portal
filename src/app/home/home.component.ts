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
  private apiUrl = environment.apiUrl + '/all_sports.php';
  private searchTeamsUrl = environment.apiUrl + '/searchteams.php?t=';

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
    this.fetchSearchTeams(input).subscribe((data: any) => {
      this.options = [];

      data.teams.forEach(item => {
        const element = {
          id: item.idTeam,
          name: item.strTeam
        };

        this.options.push(element);
      });
    });
  }

  selectTeam(id: number): void {
    this.router.navigate(['/team/' + id]);
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
    return this.http.get(this.searchTeamsUrl + input);
  }

  selectLeague(sport: any): void {
    this.store.selectCountry(null);
    this.store.selectLeague(sport);
  }

}
