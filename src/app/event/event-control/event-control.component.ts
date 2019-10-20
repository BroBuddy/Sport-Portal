import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-control',
  templateUrl: './event-control.component.html'
})
export class EventControlComponent implements OnInit {

  public eventForm: any;
  private searchUrl = environment.apiUrl;

  constructor(private fb: FormBuilder,
              private eventService: EventService) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      date: [new Date()]
    });

    this.triggerEvent();
  }

  triggerEvent(): void {
    const date = this.eventForm.value.date;
    const formatDate = date.getFullYear() + '-'
      + (((date.getMonth() + 1) < 10) ? '0' : '') + (date.getMonth() + 1) + '-'
      + ((date.getDate() < 10) ? '0' : '') + date.getDate();

    const url = this.searchUrl + '/eventsday.php?d=' + formatDate;
    this.eventService.fetchData(url);
  }

}
