import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModalService } from '~common/modals';
import { SupplierService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Supplier } from '~models';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
	providers: [
		ListPageService
	]
})
export class SuppliersPageComponent extends AutoUnsub implements OnInit, AfterViewInit {

	erm = ERM;

	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.CREATED_BY,
		FilterType.FAVORITE,
		FilterType.SUPPLIER_STATUS,
		FilterType.TAGS
	];

	constructor(
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
			searchedFields: ['name', 'tags.name', 'categories.name', 'description'],
			selectParams: { query: 'deleted == false' },
			entityMetadata: ERM.SUPPLIER,
			initialFilters: [],
		}, false);
	}

	onViewChange(view: 'list' | 'board' | 'card') {
		this.listSrv.changeView(view);
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}

	getFilterAmount() {
		const filters = this.listSrv.filterList.asFilters()
			.filter(fil => !(fil.type === FilterType.ARCHIVED && fil.value === false) && !(fil.type === FilterType.DELETED && fil.value === false));
		return filters.length;
	}
}
