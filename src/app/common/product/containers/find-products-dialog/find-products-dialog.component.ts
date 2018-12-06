import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ProductService } from '~entity-services';
import { ERM, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { TrackingComponent } from '~utils/tracking-component';
import { ListPageService } from '~core/list-page/list-page.service';
import { ListPageKey } from '~core/list-page/list-page-keys.enum';


@Component({
	selector: 'find-products-dialog-app',
	templateUrl: './find-products-dialog.component.html',
	styleUrls: ['./find-products-dialog.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService]
})
export class FindProductsDialogComponent extends TrackingComponent implements OnInit, AfterViewInit {

	@Input() initialSelectedProducts: Product[];
	@Input() submitCallback: (sel: { selectedProducts, unselectedProducts }) => Observable<any>;
	searchFilterElements$: Observable<any[]>;
	unselectedProducts: { [key: string]: Product } = {};

	constructor(
		public listSrv: ListPageService<Product, ProductService>,
		private productSrv: ProductService,
		private dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.FIND_PRODUCT,
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			initialSortBy: 'category.name',
			entityMetadata: ERM.PRODUCT,
		});
	}

	ngAfterViewInit() {
		if (this.initialSelectedProducts && this.initialSelectedProducts.length > 0) {
			this.listSrv.selectAll(this.initialSelectedProducts.map(product => ({ id: product.id })));
		}
	}

	getSelectedProducts() {
		return this.listSrv.getSelectedValues();
	}

	hasSelectedProducts() {
		return (Array.from(this.listSrv.selectionSrv.selection.values()).length > 0);
	}

	onItemSelected(entity: any, checkFavorite = false) {
		delete this.unselectedProducts[entity.id];
		this.listSrv.selectionSrv.selectOne(entity, checkFavorite);
	}


	onItemUnselected(entity: any, checkFavorite = false) {
		this.unselectedProducts[entity.id] = entity;
		this.listSrv.selectionSrv.unselectOne(entity, checkFavorite);
	}

	closeDlg() {
		this.dlgSrv.close();
	}

	submit() {
		// we add each project one by one to the store
		const selectedProducts = this.listSrv.getSelectedValues();
		const unselectedProducts = Object.values(this.unselectedProducts);
		this.submitCallback({ selectedProducts, unselectedProducts })
			.subscribe(() => this.dlgSrv.close());
	}
}
