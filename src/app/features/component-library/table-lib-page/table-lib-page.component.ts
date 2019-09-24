import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ListPageKey, EntityTableComponent, ListPageService } from '~core/list-page';
import { Sort } from '~shared/table/components/sort.interface';
import { SupplierService } from '~core/entity-services';
import { ERM, Supplier } from '~core/models';
import { Subject } from 'rxjs';

@Component({
	selector: 'table-lib-page-app',
	templateUrl: './table-lib-page.component.html',
	styleUrls: ['./table-lib-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class TableLibPageComponent extends EntityTableComponent<Supplier> implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;
	currentSort: Sort = {
		sortBy: 'name',
		descending: false
	};
	_destroy$ = new Subject<void>();

	constructor(
		private supplierSrv: SupplierService,
		public listSrv: ListPageService<Supplier, SupplierService>
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

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}

}
