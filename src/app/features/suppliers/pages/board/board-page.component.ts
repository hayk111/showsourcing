import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SuppliersTableComponent } from '~common/tables/suppliers-table/suppliers-table.component';
import { SupplierService } from '~core/erm';
import { ListPageService, ListPageViewService, SelectionService } from '~core/list-page';
import { SelectParamsConfig } from '~core/erm';
import { ERM, Supplier } from '~core/erm';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { ListHelperService } from '~core/list-page2';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';
import { FilterService } from '~core/filters';

// A doctor accidentally prescribes his patient a laxative instead of a coughing syrup.
// -
// Three days later the patient comes for a check-up and the doctor asks: “Well? Are you still coughing?”
// -
// The patient replies: “No. I’m afraid to.”

@Component({
	selector: 'board-page-app',
	templateUrl: './board-page.component.html',
	styleUrls: ['./board-page.component.scss'],
	providers: [
		ListHelperService,
		ListPageViewService,
		FilterService,
		KanbanSelectionService
	],
	host: {
		class: 'table-page'
	}
})
export class BoardPageComponent implements OnInit {

	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.CREATED_BY,
		FilterType.FAVORITE,
		FilterType.STATUS,
		FilterType.TAGS
	];


	constructor(
		public listHelper: ListHelperService,
		public dialogCommonSrv: DialogCommonService,
		public viewSrv: ListPageViewService<any>,
		public kanbanSelectionSrv: KanbanSelectionService
	) {
	}

	ngOnInit() {
		// TODO
	}



}
