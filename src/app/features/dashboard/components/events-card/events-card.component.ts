import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '~shared/base-component/base-component';

@Component({
  selector: 'events-card-app',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsCardComponent extends BaseComponent implements OnInit {
  events = [
    { startAt: new Date(), endAt: new Date((new Date).getDate() + 1), name: 'Super event', address: 'Guangzhou', country: 'CH' },
    { startAt: new Date(), endAt: new Date((new Date).getDate() + 1), name: 'Better event', address: 'Guangzhou', country: 'ch' }
  ]
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
