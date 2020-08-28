import { Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SuppliersTableComponent } from '~common/tables/suppliers-table/suppliers-table.component';
import { FilterService } from '~core/filters';
import { ListHelper2Service, ListPageViewService, SelectionService } from '~core/list-page2';
import { FilterType } from '~shared/filters';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { SortService } from '~shared/table/services/sort.service';
import { AutoUnsub } from '~utils';

// A doctor accidentally prescribes his patient a laxative instead of a coughing syrup.
// -
// Three days later the patient comes for a check-up and the doctor asks: “Well? Are you still coughing?”
// -
// The patient replies: “No. I’m afraid to.”

@Component({
	selector: 'table-page-app',
	templateUrl: './table-page.component.html',
	styleUrls: ['./table-page.component.scss'],
	providers: [
		ListHelper2Service,
		ListPageViewService,
		FilterService,
		SortService,
		PaginationService,
		SelectionService
	],
	host: {
		class: 'table-page'
	}
})
export class TablePageComponent extends AutoUnsub implements OnInit {


	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.CREATED_BY,
		FilterType.FAVORITE,
		FilterType.STATUS,
		FilterType.TAGS
	];

	columns = SuppliersTableComponent.DEFAULT_COLUMNS;
	tableConfig = SuppliersTableComponent.DEFAULT_TABLE_CONFIG;

	constructor(
		public sortSrv: SortService,
		public filterSrv: FilterService,
		public listHelper: ListHelper2Service,
		public dialogCommonSrv: DialogCommonService,
		public viewSrv: ListPageViewService<any>,
		public selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		this.filterSrv.setup([], ['name']);
		this.listHelper.setup('Supplier', this._destroy$);
		this.viewSrv.setup({ typename: 'Supplier', destUrl: 'suppliers', view: 'table' });
	}

}
