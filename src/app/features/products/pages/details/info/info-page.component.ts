import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap, map, first } from 'rxjs/operators';
import { productDetailsDescriptorMock, shippingPackagingDescriptorMock } from './descriptors';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { AutoUnsub } from '~utils';
import { api, Product, Descriptor } from 'showsourcing-api-lib';
import * as _ from 'lodash';

@Component({
	selector: 'info-page-app',
	templateUrl: './info-page.component.html',
	styleUrls: ['./info-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPageComponent extends AutoUnsub implements OnInit {

	product$: Observable<Product>;
	product: Product;
	properties: any;

	descriptor: Descriptor = api.Descriptor.getByType('PRODUCT');

	constructor(
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef,
		public dlgCommonSrv: DialogCommonService
	) {
		super();
	}

	ngOnInit() {
		console.log('InfoPageComponent -> ngOnInit -> this.descriptor', this.descriptor);
		this.product$ = api.Product.get$(this.route.parent.snapshot.params.id).data$
			.pipe(
				takeUntil(this._destroy$),
				tap(product => {
					this.product = product;
				}),
				tap(product => {
					const props = {
						...product?.propertiesMap,
						name: product?.name,
						supplier: product?.supplier,
						category: product?.category,
					};

					if (!_.isEqual(this.properties, props)) {
						this.properties = props;
					}
				}),
				tap(_ => this.cd.markForCheck()),
			);
	}

	update(property: Partial<Product>) {
		const propertiesToUpdate: any = {
			propertiesMap: {}
		};

		if (property) {
			Object.keys(property).forEach(key => {
				if (this.isRoot(key)) {
					propertiesToUpdate[key] = property[key];
				} else {
					propertiesToUpdate.propertiesMap[key] = property[key];
					if (key === 'price') {
						propertiesToUpdate.propertiesMap[key] = {
							...this.product?.propertiesMap?.price,
							...((property as any).price.value && {value: (property as any).price.value} ),
							...((property as any).price.code && {currency: (property as any).price.code} )
						};
					} else if (key === 'product_dimension') {
						propertiesToUpdate.propertiesMap[key] = {
							...this.product?.propertiesMap?.product_dimension,
							...property[key],
						};
					}
				}
			});
		}

		api.Product.update([{
			id: this.product.id,
			...propertiesToUpdate
		}]);
	}

	private isRoot(propertyName: string) {
		switch (propertyName) {
			case 'name'			 :
			case 'supplierId':
			case 'categoryId':
			case 'supplier'   :
			case 'category'  :
				return true;
			default:
				return false;
		}
	}
}
