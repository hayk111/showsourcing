import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierFeatureService } from '~features/supplier/services';
import { ERM, Supplier } from '~models';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { FilterType } from '~shared/filters';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { ListPageProviders } from '~shared/list-page/list-page-providers.class';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
	providers: [
		CommonDialogService,
		ListPageProviders.getProviders('suppliers-page', ERM.SUPPLIER)
	]
})
export class SuppliersPageComponent extends TrackingComponent
	implements OnInit {
	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.TAGS,
		FilterType.EVENT,
		FilterType.SUPPLIER_STATUS,
		FilterType.CREATED_BY,
		FilterType.FAVORITE
	];

	constructor(
		protected router: Router,
		protected featureSrv: SupplierFeatureService,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService,
		protected viewSrv: ListPageViewService<Supplier>,
		protected dataSrv: ListPageDataService<Supplier, SupplierFeatureService>
	) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name', 'tag.name', 'category.name'],
			initialSortBy: 'name'
		});
		this.dataSrv.init();
	}
}
