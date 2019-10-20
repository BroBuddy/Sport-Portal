import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-control',
  templateUrl: './search-control.component.html'
})
export class SearchControlComponent implements OnInit {

  public searchForm: any;
  private searchUrl = environment.apiUrl;

  constructor(private fb: FormBuilder,
              private searchService: SearchService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      category: ['teams'],
      input: ['']
    });
  }

  triggerSearch(): void {
    const category = this.searchForm.value.category;
    const input = this.searchForm.value.input;

    if (input.length >= 3) {
      const file = 'search' + category + '.php';
      const param = category.charAt(0);
      const url = this.searchUrl + '/' + file + '?' + param + '=' + input;
      this.searchService.fetchData(url, category);
    } else {
      this.searchService.data$ = null;
      this.searchService.category = null;
      this.searchService.dataReady = false;
    }
  }

}
