import { ChangeDetectionStrategy, Component, OnInit, NgModuleRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil, switchMap, tap, catchError, take, first } from 'rxjs/operators';
import { NewProductDialogComponent } from '~features/products/components/new-product-dialog/new-product-dialog.component';
import { ProductService, SupplierService } from '~global-services';
import { ERM, Product, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterList, SearchService, FilterType } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { AddProductsDialogComponent } from '~features/project/containers/add-products-dialog/add-products-dialog.component';

@Component({
	selector: 'supplier-app',
	templateUrl: './supplier-products.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService
	]
})
export class SupplierProductsComponent extends ListPageComponent<Product, ProductService> implements OnInit {

	supplier$: Observable<Supplier>;
	private supplierId: string;

	constructor(
		protected router: Router,
		protected srv: ProductService,
		protected supplierSrv: SupplierService,
		protected selectionSrv: SelectionService,
		// protected filterSrv: FilterService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected route: ActivatedRoute,
		protected moduleRef: NgModuleRef<any>) {
		super(router, srv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT, AddProductsDialogComponent);
		this.filterList = new FilterList([
			{ type: 'supplier.id', comparator: '==' , value: route.snapshot.params.id }
		]);
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
			tap(id => this.supplierId = id),
		);
		this.supplier$ = id$.pipe(switchMap(id => this.supplierSrv.selectOne(id)));
		// we need to wait to have the id to call super.ngOnInit, because we want the filter
		// method to be called when we actually have the id
		id$.pipe(
			first()
		).subscribe(_ => super.ngOnInit());
	}

	/** Filters items based  */
	/* protected filter(query: string) {
		if (query)
			super.filter(`supplier.id == "${this.supplierId}" AND (${query})`);
		else
			super.filter(`supplier.id == "${this.supplierId}"`);
	} */

}
