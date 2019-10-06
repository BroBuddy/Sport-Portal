import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../shared/services/store.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private apiUrl = 'https://www.thesportsdb.com/api/v1/json/1/all_sports.php';
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

  selectSport(sport: any): void {
    this.store.selectSport(sport);
  }

}
