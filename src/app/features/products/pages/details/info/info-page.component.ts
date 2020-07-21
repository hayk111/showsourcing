import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap, map } from 'rxjs/operators';
import { productDetailsDescriptorMock, shippingPackagingDescriptorMock } from './descriptors';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { AutoUnsub } from '~utils';
import { api, Product, Descriptor } from 'showsourcing-api-lib';


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
			map(descriptors => descriptors.length && descriptors[0])
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
			console.log('InfoPageComponent -> ngOnInit -> data DDD', data);
		});
		this.product$ = api.Product.get(this.route.parent.snapshot.params.id)
			.pipe(
				takeUntil(this._destroy$),
				tap(product => {
					this.product = product;
				}),
				// tap(_ => this.properties = { ...this.product.propertiesMap }),
				tap(_ => this.cd.markForCheck())
			);
	}

	update(property: Partial<Product>) {
		console.log('InfoPageComponent -> update -> property---', property);
		const propertiesToUpdate: any = {
			propertiesMap: {}
		};

		if (property) {
			Object.keys(property).forEach(key => {
				if (this.isRoot(key)) {
					console.log('InfoPageComponent -> update -> property[key]', property[key]);
					propertiesToUpdate[key] = property[key];
				} else {
					propertiesToUpdate.propertiesMap[key] = property[key];
				}
			});
		}

		console.log('InfoPageComponent -> update -> propertiesToUpdate', propertiesToUpdate);
		api.Product.update([{
			id: this.product.id,
			...propertiesToUpdate
		}]).subscribe();
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

	info(ev) {
		console.log('InfoPageComponent -> info -> ev', ev);
	}
}
