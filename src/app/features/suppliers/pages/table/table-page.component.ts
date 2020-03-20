import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SuppliersTableComponent } from '~common/tables/suppliers-table/suppliers-table.component';
import { SupplierService } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { SelectParamsConfig } from '~core/erm';
import { ERM, Supplier } from '~core/erm';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { ListHelperService, ListPageViewService, SelectionService } from '~core/list-page2';
import { FilterService } from '~core/filters';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CloseEventType } from '~shared/dialog';

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
		ListHelperService,
		ListPageViewService,
		FilterService,
		SelectionService
	],
	host: {
		class: 'table-page'
	}
})
export class TablePageComponent implements OnInit {

	items$: Observable<Supplier[]>;

	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.CREATED_BY,
		FilterType.FAVORITE,
		FilterType.SUPPLIER_STATUS,
		FilterType.TAGS
	];

	columns = SuppliersTableComponent.DEFAULT_COLUMNS;
	tableConfig = SuppliersTableComponent.DEFAULT_TABLE_CONFIG;

	constructor(
		public listHelper: ListHelperService,
		public dialogCommonSrv: DialogCommonService,
		public viewSrv: ListPageViewService<any>,
		public selectionSrv: SelectionService
	) { }

	ngOnInit() {
		this.listHelper.setup('Supplier');
		this.items$ = this.listHelper.filteredItems$;
	}

	createSupplier() {
		this.dialogCommonSrv.openCreateDlg('Supplier').pipe(
			filter(event => event.type === CloseEventType.OK),
			map(event => event.data)
		).subscribe();
	}

}
