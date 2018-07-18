import {
	ChangeDetectionStrategy, Component, OnInit, ViewChild, Output,
	EventEmitter, TemplateRef, Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { NewProductDialogComponent } from '~features/products/components/new-product-dialog/new-product-dialog.component';
import { ProductService } from '~global-services';
import { Product, ERM } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService, SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils';
import { TableDescriptor, ColumnDescriptor } from '~shared/table';

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
export class ProjectProductsComponent extends ListPageComponent<Product, ProductService> {
	constructor(
		protected router: Router,
		protected srv: ProductService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService) {
		super(router, srv, selectionSrv, filterSrv, searchSrv, dlgSrv, ERM.PRODUCT, NewProductDialogComponent);
	}


	// TODO we need to change the relation from project.products to product.projects
	// since we are filtering the name
}
