import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent {

  constructor(public searchService: SearchService,
              private router: Router) { }

  selectResult(id: number): void {
    const category = this.searchService.category;
    this.router.navigate(['/' + category.slice(0, -1) + '/' + id]);
  }

  trackByFn(index): number {
    return index;
  }

}
