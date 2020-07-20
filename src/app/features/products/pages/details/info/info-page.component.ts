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

	descriptor$: Observable<Descriptor>;

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
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => api.Product.get(params.id)),
			tap(product => this.product = product),
			tap(_ => this.cd.markForCheck())
		);
	}

	update(property: Partial<Product>) {
		console.log('InfoPageComponent -> update -> property', property);

		const propertyName = Object.keys(property)[0];

		if (this.isRoot(propertyName)) {
			api.Product.update([{
				id: this.product.id,
				[propertyName]: property[propertyName]
			}]).subscribe();
		} else {
			api.Product.update([{
				id: this.product.id,
				propertiesMap: property
			}]).subscribe();
		}
	}

	private isRoot(propertyName: string) {
		switch (propertyName) {
			case 'name' :
				return true;
			default:
				return false;
		}
	}
}
