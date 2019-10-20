import { Component } from '@angular/core';

import { EventService } from '../event.service';

@Component({
  selector: 'app-event-result',
  templateUrl: './event-result.component.html'
})
export class EventResultComponent {

  constructor(public eventService: EventService) { }

  trackByFn(index): number {
    return index;
  }

}
