import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivityService, GetStreamResult } from '~shared/activity/services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'product-activity-app',
  templateUrl: './product-activity.component.html',
  styleUrls: ['./product-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActivityComponent implements OnInit {

  feedName: string[];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.feedName = ['product_aggregated', this.route.parent.snapshot.params.id];
  }

}
