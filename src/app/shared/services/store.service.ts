import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public sport: any;

  selectSport(data: any): void {
    this.sport = data;
  }
}
