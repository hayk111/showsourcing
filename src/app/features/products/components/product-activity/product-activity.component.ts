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
export class ProductActivityComponent extends AutoUnsub implements OnInit {
  feed$: Observable<GetStreamResult[]>;
  private page$ = new BehaviorSubject(0);
  private page: number;

  constructor(
    private activitySrv: ActivityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // the name of the feed on getStream is product_flat:${id_product}
    this.feed$ = this.activitySrv.getFeed({
      page$: this.page$,
      feedName: `product_flat:${this.route.snapshot.params.id}`
    });

    // saving page so we can modify it
    this.page$.pipe(
      takeUntil(this._destroy$)
    ).subscribe(page => this.page = page)
  }

  loadMore() {
    this.page$.next(++this.page);
  }

}
