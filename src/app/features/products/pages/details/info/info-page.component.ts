import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap, map, first } from 'rxjs/operators';
import { productDetailsDescriptorMock, shippingPackagingDescriptorMock } from './descriptors';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { AutoUnsub } from '~utils';
import { api, Product, Descriptor } from 'showsourcing-api-lib';
import _ from 'lodash';

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

	descriptor$ = api.Descriptor.findByType('PRODUCT')
		.data$
		.pipe(
			map(descriptors => descriptors.length && descriptors[0]),
			first(),
		);

	constructor(
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef,
		public dlgCommonSrv: DialogCommonService
	) {
		super();
	}

	ngOnInit() {
		api.Descriptor.findByType('PRODUCT').data$.subscribe(data => {
			console.log('Desctriptor data:', data); // this log is needed to stay for a little while
		});
		console.log('InfoPageComponent -> ngOnInit -> this.route.parent.snapshot.params', this.route.parent.snapshot.params.id);

		this.product$ = api.Product.get(this.route.parent.snapshot.params.id)
			.pipe(
				takeUntil(this._destroy$),
				tap(product => {
					this.product = product;
				}),
				tap(product => {
					const props = {
						...product.propertiesMap,
						name: product.name,
						supplierId: product.supplierId,
						categoryId: product.categoryId,
					};

					if (!_.isEqual(this.properties, props)) {
						this.properties = props;
					}
				}),
				// tap(_ => this.properties = { ...this.product.propertiesMap }),
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
					if (key === 'price') { // temporary solutionn for price with default currenct "USD"
						propertiesToUpdate.propertiesMap[key] = {
							...propertiesToUpdate.propertiesMap[key],
							currency: 'USD'
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

	get rootProperties() {
		const { supplierId, categoryId } = this.product;
		return { name: this.product.name, supplierId, categoryId };
	}

	private isRoot(propertyName: string) {
		switch (propertyName) {
			case 'name':
			case 'supplierId':
			case 'categoryId':
				return true;
			default:
				return false;
		}
	}
}
