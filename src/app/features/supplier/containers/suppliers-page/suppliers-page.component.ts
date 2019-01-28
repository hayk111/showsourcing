import { Component, OnInit } from '@angular/core';
import { SupplierService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Supplier } from '~models';
import { FilterType } from '~shared/filters';
import { TrackingComponent } from '~utils/tracking-component';
import { CommonModalService } from '~common/modals';
import { Router, ActivatedRoute } from '@angular/router';

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
	erm = ERM;

	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.TAGS,
		FilterType.EVENT,
		FilterType.SUPPLIER_STATUS,
		FilterType.CREATED_BY,
		FilterType.FAVORITE
	];

	constructor(
		private route: ActivatedRoute,
		private supplierSrv: SupplierService,
		public listSrv: ListPageService<Supplier, SupplierService>,
		public commonModalSrv: CommonModalService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.SUPPLIER,
			entitySrv: this.supplierSrv,
			searchedFields: ['name', 'tags.name', 'categories.name'],
			entityMetadata: ERM.SUPPLIER,
			initialFilters: [],
		});
	}
}
