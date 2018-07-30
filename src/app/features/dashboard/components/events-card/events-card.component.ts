import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'events-card-app',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsCardComponent implements OnInit {
  events = [
    { startAt: new Date(), endAt: new Date((new Date).getDate() + 1), name: 'Super event', address: 'Guangzhou', country: 'CH' },
    { startAt: new Date(), endAt: new Date((new Date).getDate() + 1), name: 'Better event', address: 'Guangzhou', country: 'ch' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
