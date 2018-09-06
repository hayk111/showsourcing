import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivityService } from '~shared/activity/services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil, switchMap, tap } from 'rxjs/operators';
import { ActivityFeed } from '~shared/activity/interfaces/client-feed.interfaces';
import { ERM, Product } from '~models';
import { AutoUnsub } from '~utils';
import { ProductFeatureService } from '~features/products/services';

@Component({
	selector: 'product-activity-app',
	templateUrl: './product-activity.component.html',
	styleUrls: ['./product-activity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActivityComponent extends AutoUnsub implements OnInit {

	product$: Observable<Product>;
	product: Product;
	feedResult: ActivityFeed;
	typeEntity = ERM.PRODUCT;

	constructor(
		private route: ActivatedRoute,
		private activitySrv: ActivityService,
		private productSrv: ProductFeatureService) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.productSrv.selectOne(params.id)),
			tap(product => this.product = product)
		);
		this.feedResult = this.activitySrv.getProductFeed(this.route.parent.snapshot.params.id);
	}

}
