import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductDescriptor } from '~core/descriptors';
import { ProductService } from '~core/erm/services';
import { Product } from '~core/erm/models';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { AutoUnsub } from '~utils';


@Component({
	selector: 'info-page-app',
	templateUrl: './info-page.component.html',
	styleUrls: ['./info-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPageComponent extends AutoUnsub implements OnInit {

	product$: Observable<Product>;
	product: Product;
	shippingDescriptor: ProductDescriptor;
	productDescriptor: ProductDescriptor;
	dynamicFormConfig = new DynamicFormConfig({
		mode: 'editable-text',
		colAmount: 2,
		inlineLabel: true,
		alignValue: 'center'
	});

	constructor(
		private route: ActivatedRoute,
		private productSrv: ProductService,
		private cd: ChangeDetectorRef,
		public dlgCommonSrv: DialogCommonService
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
			'name',
			'reference',
			'supplier-reference',
			'price',
			'moq',
			'supplier-name',
			'category',
			'event'
		]);
		this.shippingDescriptor = new ProductDescriptor([
			'innerCarton', 'sample', 'samplePrice', 'priceMatrix', 'masterCarton', 'incoTerm',
			'harbour', 'masterCbm', 'quantityPer20ft', 'quantityPer40ft', 'quantityPer40ftHC'
		]);

		this.productDescriptor.modify([
			{ name: 'reference', label: 'item-reference' },
			{ name: 'price', label: 'sales-price' },
			{ name: 'event', label: 'trade-show' },
		]);

		this.shippingDescriptor.insert({ name: 'sample', type: 'title' }, 'sample');
		this.shippingDescriptor.insert({ name: 'shipping', type: 'title' }, 'incoTerm');
		// we need this empty objects since innercarton, mastercarton, pricematrix, have more rows inside the dynamic form
		// therefore we have to add extra spaces, so we get the correct alignment
		this.shippingDescriptor.insertBlank('masterCarton');
		this.shippingDescriptor.insertBlank('masterCarton');
		this.shippingDescriptor.insertBlank('masterCarton');
	}

	update(product: Product) {
		product.id = this.product.id;
		this.productSrv.update(product).subscribe();
	}
}
