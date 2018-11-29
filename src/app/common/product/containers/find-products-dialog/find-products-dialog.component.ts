import { AfterViewInit, ChangeDetectorRef, Component, Input, NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ERM, Product, ERM_TOKEN } from '~models';
import { ProductService } from '~global-services';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { ListPageProviders } from '~core/list-page/list-page-providers.class';

@Component({
	selector: 'find-products-dialog-app',
	templateUrl: './find-products-dialog.component.html',
	styleUrls: ['./find-products-dialog.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageProviders.getProviders('products-page', ERM.PRODUCT),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.PRODUCT }
	]
})
export class FindProductsDialogComponent extends TrackingComponent implements OnInit, AfterViewInit {

	@Input() initialSelectedProducts: Product[];
	@Input() submitCallback: Function;
	searchFilterElements$: Observable<any[]>;

	unselectedProducts: { [key: string]: Product } = {};
	constructor(
		protected router: Router,
		protected cdr: ChangeDetectorRef,
		protected featureSrv: ProductService,
		protected viewSrv: ListPageViewService<Product>,
		public dataSrv: ListPageDataService<Product, ProductService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
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
	}

	ngAfterViewInit() {
		if (this.initialSelectedProducts && this.initialSelectedProducts.length > 0) {
			this.selectionSrv.selectAll(this.initialSelectedProducts.map(product => ({ id: product.id })));
		}
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
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
		this.commonDlgSrv.close();
	}

	submit() {
		// we add each project one by one to the store
		const selectedProducts = this.getSelectedProducts();
		const unselectedProducts = Object.keys(this.unselectedProducts).map(key => this.unselectedProducts[key]);
		this.submitCallback({ selectedProducts, unselectedProducts })
			.subscribe(() => {
				this.commonDlgSrv.close();
			});
	}
}
