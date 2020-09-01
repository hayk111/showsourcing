import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { isUuid } from '~utils/uuid.utils';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap, map, skip } from 'rxjs/operators';
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
	@Input() product: Product;

	product$: Observable<Product>;
	properties: any;

	descriptor: Descriptor = api.Descriptor.getByType('PRODUCT');

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private cd: ChangeDetectorRef,
		public dlgCommonSrv: DialogCommonService
	) {
		super();
	}

	ngOnInit() {
		const props = {
			...this.product?.propertiesMap,
			name: this.product?.name,
			supplier: this.product?.supplier,
			category: this.product?.category,
		};

		// properties should be removed
		this.properties = props;
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
