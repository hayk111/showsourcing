import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { ActivityService } from '~common/activity/services/activity.service';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product } from '~models';
import { AutoUnsub } from '~utils';




@Component({
	selector: 'product-activity-app',
	templateUrl: './product-activity.component.html',
	styleUrls: ['./product-activity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActivityComponent extends AutoUnsub implements OnInit {
	selectedTab = 'comments';
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
