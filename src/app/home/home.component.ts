import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../shared/services/store.service';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private apiUrl = environment.apiUrl + '/all_sports.php';
  public sportsList: any[] = [];

  constructor(private http: HttpClient,
              private store: StoreService) { }

  ngOnInit(): void {
    this.fetchData().subscribe((data: any) => {
      this.sportsList = data.sports;
    });
  }

  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  selectLeague(sport: any): void {
    this.store.selectCountry(null);
    this.store.selectLeague(sport);
  }

}
