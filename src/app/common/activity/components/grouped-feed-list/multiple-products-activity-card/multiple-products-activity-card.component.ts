import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { ProductService } from '~entity-services';
import { Product, Supplier } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'multiple-products-activity-card-app',
	templateUrl: './multiple-products-activity-card.component.html',
	styleUrls: ['./multiple-products-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleProductsActivityCardComponent extends AutoUnsub implements OnInit {

	@Input() groupFeed: GetStreamGroup;
	@Output() update = new EventEmitter<Product>();
	@Output() previewClick = new EventEmitter<Product>();
	@Output() liked = new EventEmitter<Product>();
	@Output() disliked = new EventEmitter<Product>();

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

	viewSupplier(supplier: Supplier) {
		this.router.navigate(['supplier', 'details', supplier.id]);
	}

}
