import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { NewProductDialogComponent } from '~features/products/components/new-product-dialog/new-product-dialog.component';
import { ProductService } from '~global-services';
import { ERM, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService, SearchService, FilterType } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils';

@Component({
	selector: 'project-products-app',
	templateUrl: './project-products.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService,
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_PROJECT_PRODUCTS }
	]
})
export class ProjectProductsComponent extends ListPageComponent<Product, ProductService> implements OnInit {

	constructor(
		protected router: Router,
		protected srv: ProductService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected route: ActivatedRoute) {
		super(router, srv, selectionSrv, filterSrv, searchSrv, dlgSrv, ERM.PRODUCT, NewProductDialogComponent);
	}

	ngOnInit() {
		this.route.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		).subscribe(id => {
			this.filterSrv.addFilter({ type: FilterType.PROJECT, value: id });
		});
		super.ngOnInit();
	}

}
