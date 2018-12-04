import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { SupplierFeatureService } from '~features/supplier/services';
import { ERM, Supplier } from '~models';
import { FilterType } from '~shared/filters';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
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
		this.viewSrv.setup(ERM.SUPPLIER);
	}
}
