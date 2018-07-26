import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GetStreamResult } from '~shared/activity/services/activity.service';

@Component({
  selector: 'activity-list-app',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityListComponent implements OnInit {
  @Input() feeds: GetStreamResult[];
  constructor() { }

  ngOnInit() {
  }

}
