import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
  selector: 'events-card-app',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsCardComponent extends TrackingComponent implements OnInit {
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
