import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-team-rating-card',
  templateUrl: './team-rating-card.component.html',
  styleUrls: ['./team-rating-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamRatingCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
