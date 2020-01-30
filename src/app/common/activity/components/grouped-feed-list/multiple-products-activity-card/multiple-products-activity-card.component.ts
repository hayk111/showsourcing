import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { ProductService } from '~core/erm';
import { ERM, Product, Supplier } from '~core/erm';
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

	time: string;
	products$: Observable<Product[]>;
	erm = ERM;

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
		this.router.navigate(['products', product.id]);
	}

	viewSupplier(supplier: Supplier) {
		this.router.navigate(['suppliers', supplier.id]);
	}

}
