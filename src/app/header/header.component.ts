import { Component } from '@angular/core';

import { StoreService } from '../shared/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public store: StoreService) { }

}
