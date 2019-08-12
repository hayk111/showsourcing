import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductDescriptor } from '~core/descriptors';
import { ProductService } from '~core/entity-services';
import { Product } from '~core/models';
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
	productDescriptor: ProductDescriptor;

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

		this.productDescriptor = new ProductDescriptor([
			'innerCarton', 'sample', 'samplePrice', 'priceMatrix', 'masterCarton', 'incoTerm',
			'harbour', 'masterCbm', 'quantityPer20ft', 'quantityPer40ft', 'quantityPer40ftHC'
		]);

		this.productDescriptor.insert({ name: 'sample', type: 'title' }, 'sample');
		this.productDescriptor.insert({ name: 'shipping', type: 'title' }, 'incoTerm');
		// we need this empty objects since innercarton, mastercarton, pricematrix, have more rows inside the dynamic form
		// therefore we have to add extra spaces, so we get the correct alignment
		this.productDescriptor.insert({ name: 'blank' }, 'masterCarton');
		this.productDescriptor.insert({ name: 'blank' }, 'masterCarton');
		this.productDescriptor.insert({ name: 'blank' }, 'masterCarton');
	}

	update(product: Product) {
		product.id = this.product.id;
		this.productSrv.update(product).subscribe();
	}

}
