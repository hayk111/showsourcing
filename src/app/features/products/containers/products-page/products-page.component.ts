import { Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { ProductService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Product } from '~models';
import { FilterType, Filter } from '~shared/filters';
import { TrackingComponent } from '~utils/tracking-component';

// dailah lama goes into pizza store
// servant asks : what pizza do you want sir ?
// dailah lama: Make me one with everything.

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	providers: [
		ListPageService
	]
})
export class ProductsPageComponent extends TrackingComponent implements OnInit {
	erm = ERM;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.ARCHIVED,
		FilterType.CATEGORY,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.FAVORITE,
		FilterType.PRODUCT_STATUS,
		FilterType.PROJECTS,
		FilterType.SUPPLIER,
		FilterType.TAGS
	];

	filterTypesCard = [
		FilterType.CATEGORY,
		FilterType.SUPPLIER,
		FilterType.FAVORITE
	];

	constructor(
		private productSrv: ProductService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Product, ProductService>
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.PRODUCTS,
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			entityMetadata: ERM.PRODUCT,
		});
	}

	onViewChange(view: 'list' | 'card') {
		// Update sorting according to the selected view
		this.listSrv.sort({ sortBy: 'category.name', descending: false });
		this.listSrv.changeView(view);
	}

}
