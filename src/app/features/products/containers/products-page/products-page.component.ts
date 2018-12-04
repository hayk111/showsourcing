import { Component, OnInit } from '@angular/core';
import { ProductFeatureService } from '~features/products/services';
import { Product, ERM_TOKEN, ERM } from '~models';
import { FilterType } from '~shared/filters';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { TrackingComponent } from '~utils/tracking-component';
import { getProviders } from '~core/list-page/list-page-providers.class';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class ProductsPageComponent extends TrackingComponent implements OnInit {
	// smartSearchFilterElements$: any;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.CATEGORY,
		FilterType.TAGS,
		FilterType.PROJECTS,
		FilterType.FAVORITE,
		FilterType.ARCHIVED,
	];

	constructor(
		public featureSrv: ProductFeatureService,
		public viewSrv: ListPageViewService<Product>,
		public dataSrv: ListPageDataService<Product, ProductFeatureService>,
		public selectionSrv: SelectionWithFavoriteService,
		public commonDlgSrv: CommonDialogService
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


	// can be overriden
	onViewChange(view: 'list' | 'card') {
		// Update sorting according to the selected view
		this.dataSrv.sort({ sortBy: 'category.name', descending: false });
		this.viewSrv.changeView(view);
	}

	// smartSearch(t: any) {
	// 	//
	// }

}
