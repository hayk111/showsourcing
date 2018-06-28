import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewProductDialogComponent } from '~features/products/components/new-product-dialog/new-product-dialog.component';
import { ProductService } from '~global-services';
import { Product } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils';

@Component({
	selector: 'app-project-products',
	templateUrl: './project-products.component.html',
	styleUrls: ['./project-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService,
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_PROJECT_PRODUCTS }
	]
})
export class ProjectProductsComponent extends ListPageComponent<Product, ProductService>
	implements OnInit {

	constructor(
		protected router: Router,
		protected srv: ProductService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService) {
		super(router, srv, selectionSrv, filterSrv, dlgSrv, 'product', NewProductDialogComponent);
	}

	ngOnInit() {
	}

}
