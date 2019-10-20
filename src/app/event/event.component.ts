import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {

  public myControl = new FormControl();
  public options: any[] = [];
  public filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
