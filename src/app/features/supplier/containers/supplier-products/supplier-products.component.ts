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
import { CreationDialogComponent } from '~shared/custom-dialog';

@Component({
	selector: 'supplier-app',
	templateUrl: './supplier-products.component.html',
	styleUrls: ['./supplier-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService
	]
})
export class SupplierProductsComponent extends ListPageComponent<Product, ProductService> implements OnInit {

	products$: Observable<Product[]>;

	constructor(
		protected router: Router,
		protected featureSrv: ProductService,
		protected selectionSrv: SelectionService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected route: ActivatedRoute,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT);

	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.initialPredicate = `supplier.id == "${id}"`;
		super.ngOnInit();
	}
}
