import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public league: any;
  public country: any;

  selectLeague(data: any): void {
    this.league = data;
  }

  selectCountry(data: any): void {
    this.country = data;
  }
}
