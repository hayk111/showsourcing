import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SupplierService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, Supplier } from '~core/models';
import { Sort } from '~shared/table/components/sort.interface';
import { EntityTableComponent } from '~common/tables/entity-table.component';

@Component({
	selector: 'table-page-app',
	templateUrl: './table-page.component.html',
	styleUrls: ['./table-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class TablePageComponent extends EntityTableComponent<Supplier> implements OnInit, OnDestroy, AfterViewInit {
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
