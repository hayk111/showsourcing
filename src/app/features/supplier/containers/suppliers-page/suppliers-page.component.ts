import { Component, OnInit } from '@angular/core';
import { SupplierService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Supplier } from '~models';
import { FilterType } from '~shared/filters';
import { TrackingComponent } from '~utils/tracking-component';
import { CommonDialogService } from '~common/dialog';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
	providers: [
		ListPageService
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
		private supplierSrv: SupplierService,
		public listSrv: ListPageService<Supplier, SupplierService>,
		public commonDlgSrv: CommonDialogService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.SUPPLIER,
			entitySrv: this.supplierSrv,
			searchedFields: ['name', 'tag.name', 'category.name'],
			initialSortBy: 'name',
			entityMetadata: ERM.SUPPLIER
		});
	}
}
