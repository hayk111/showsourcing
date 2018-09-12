import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models';
import { Router } from '@angular/router';
import { ProductService } from '~global-services';
import { GetStreamGroup } from '~shared/activity/interfaces/get-stream-feed.interfaces';
import { Observable } from 'rxjs';
import { AutoUnsub } from '~utils';
import { takeUntil, first, map } from 'rxjs/operators';

@Component({
	selector: 'multiple-products-activity-card-app',
	templateUrl: './multiple-products-activity-card.component.html',
	styleUrls: ['./multiple-products-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleProductsActivityCardComponent extends AutoUnsub implements OnInit {

	@Input() groupFeed: GetStreamGroup;
	time: Date;
	products$: Observable<Product[]>;

	constructor(
		private router: Router,
		private productSrv: ProductService) {
		super();
	}

	ngOnInit() {
		const productIds = this.groupFeed.activities.map(activity => `id == "${activity.object}"`);
		const query = productIds.join(' OR ');
		this.products$ = this.productSrv.queryMany({ query });
		this.time = this.groupFeed.updated_at;
	}

	viewProduct(product: Product) {
		this.router.navigate(['product', 'details', product.id]);
	}

}
