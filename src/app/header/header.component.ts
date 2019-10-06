import { Component, OnInit } from '@angular/core';

import { StoreService } from '../shared/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public store: StoreService) { }

  ngOnInit(): void {
  }

}
