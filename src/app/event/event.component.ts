import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {

  public myControl = new FormControl();
  public options: any[] = [];
  public filteredOptions: Observable<string[]>;
  private eventUrl = environment.apiUrl + '/searchevents.php?e=';

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  triggerEvent(input: string): void {
    const url =  this.eventUrl;

    if (input.length >= 3) {
      this.fetchEvent(url + input).subscribe((data: any) => {
        this.options = [];
  
        const items = data.event;
  
        items.forEach(item => {
          const element = {
            id: item.idTeam,
            name: item.strEvent,
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

  fetchEvent(input: string): Observable<any> {
    return this.http.get(input);
  }

  enterEvent(event: any): void {
    this.selectOption(event.target.value);
  }

  selectOption(id: number): void {
    this.router.navigate(['/event/' + id]);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.indexOf(filterValue) === 0);
  }

}
