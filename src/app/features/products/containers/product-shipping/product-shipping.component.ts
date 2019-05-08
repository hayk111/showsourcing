import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductService } from '~core/entity-services';
import { ERM, Product } from '~core/models';
import { DynamicField } from '~shared/dynamic-forms';
import { AutoUnsub } from '~utils';

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
		{ name: 'innerCarton', type: 'packaging', label: 'inner carton' },
		{ name: 'sample', type: 'title' },
		{ name: 'sample', type: 'yesNo' },
		{ name: 'samplePrice', type: 'price', label: 'Sample Price' },
		{ name: 'priceMatrix', type: 'priceMatrix', label: 'price matrix' },
		// we need this empty objects since innercarton, mastercarton, pricematrix, have more rows inside the dynamic form
		// therefore we have to add extra spaces, so we get the correct alignment
		{},
		{},
		{},
		{ name: 'masterCarton', type: 'packaging', label: 'master carton' },
		{ name: 'shipping', type: 'title' },
		{
			name: 'incoTerm', type: 'selector', label: 'INCO Term',
			metadata: { target: ERM.INCOTERM.singular, canCreate: false, multiple: false, labelName: 'name', type: 'const' }
		},
		{
			name: 'harbour', type: 'selector', label: 'loading port',
			metadata: { target: ERM.HARBOUR.singular, canCreate: false, multiple: false, labelName: 'name', type: 'const' }
		},
		{ name: 'masterCbm', type: 'decimal', label: 'Master Carton CBM' },
		{ name: 'quantityPer20ft', type: 'number', label: `Quantity per 20'` },
		{ name: 'quantityPer40ft', type: 'number', label: `Quantity per 40'` },
		{ name: 'quantityPer40ftHC', type: 'number', label: `Quantity per 40' HC` },
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
