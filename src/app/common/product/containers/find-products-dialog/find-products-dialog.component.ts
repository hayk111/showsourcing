import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { getProviders } from '~core/list-page/list-page-providers.class';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ProductService } from '~entity-services';
import { Product, ERM } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { DialogService } from '~shared/dialog';


@Component({
	selector: 'find-products-dialog-app',
	templateUrl: './find-products-dialog.component.html',
	styleUrls: ['./find-products-dialog.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class FindProductsDialogComponent extends TrackingComponent implements OnInit, AfterViewInit {

	@Input() initialSelectedProducts: Product[];
	@Input() submitCallback: (sel: { selectedProducts, unselectedProducts }) => Observable<any>;
	searchFilterElements$: Observable<any[]>;
	unselectedProducts: { [key: string]: Product } = {};

	constructor(
		protected router: Router,
		protected cdr: ChangeDetectorRef,
		protected featureSrv: ProductService,
		protected viewSrv: ListPageViewService<Product>,
		public dataSrv: ListPageDataService<Product, ProductService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService,
		protected dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			initialSortBy: 'category.name'
		});
		this.dataSrv.init();
		this.viewSrv.setup(ERM.PRODUCT);
	}

	ngAfterViewInit() {
		if (this.initialSelectedProducts && this.initialSelectedProducts.length > 0) {
			this.selectionSrv.selectAll(this.initialSelectedProducts.map(product => ({ id: product.id })));
		}
	}

	getSelectedProducts() {
		return this.selectionSrv.getSelectionValues();
	}

	hasSelectedProducts() {
		return (Array.from(this.selectionSrv.selection.values()).length > 0);
	}

	onItemSelected(entity: any, checkFavorite = false) {
		delete this.unselectedProducts[entity.id];
		this.selectionSrv.selectOne(entity, checkFavorite);
	}


	onItemUnselected(entity: any, checkFavorite = false) {
		this.unselectedProducts[entity.id] = entity;
		this.selectionSrv.unselectOne(entity, checkFavorite);
	}

	closeDlg() {
		this.dlgSrv.close();
	}

	submit() {
		// we add each project one by one to the store
		const selectedProducts = this.selectionSrv.getSelectionValues();
		const unselectedProducts = Object.values(this.unselectedProducts);
		this.submitCallback({ selectedProducts, unselectedProducts })
			.subscribe(() => this.dlgSrv.close());
	}
}
