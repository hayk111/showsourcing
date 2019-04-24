import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductService } from '~core/entity-services';
import { ERM, Product } from '~core/models';
import { DynamicField } from '~shared/dynamic-forms';
import { AutoUnsub, translate } from '~utils';

@Component({
	selector: 'product-shipping-app',
	templateUrl: './product-shipping.component.html',
	styleUrls: ['./product-shipping.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShippingComponent extends AutoUnsub implements OnInit {

	product$: Observable<Product>;
	product: Product;

	customFields: DynamicField[] = [
		{ name: 'innerCarton', type: 'packaging', label: translate('inner carton') },
		{ name: 'sample', type: 'yesNo' },
		{ name: 'samplePrice', type: 'price', label: translate('sample price') },
		{ name: 'masterCarton', type: 'packaging', label: translate('master carton') },
		{ name: 'priceMatrix', type: 'priceMatrix', label: translate('price matrix') },
	];

	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private productSrv: ProductService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.productSrv.selectOne(params.id)),
			tap(product => this.product = product),
			tap(_ => this.cd.markForCheck())
		);
	}

	update(product: Product) {
		product.id = this.product.id;
		this.productSrv.update(product).subscribe();
	}

}
