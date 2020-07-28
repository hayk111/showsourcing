import { Component, Input, OnInit } from '@angular/core';
import { ColumnConfig } from '~common/tables/entity-table.component';
import { SortService } from '~shared/table/services/sort.service';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Typename } from 'showsourcing-api-lib';

@Component({
	selector: 'controller-table-quick-actions-app',
	templateUrl: './controller-table-quick-actions.component.html',
	styleUrls: ['./controller-table-quick-actions.component.scss'],
})
export class ControllerTableQuickActionsComponent implements OnInit {
	@Input() hasSort = true;
	@Input() hasExport = true;
	@Input() tableConfig: ColumnConfig[] = [];
	@Input() columns: string[];
	@Input() typename: Typename;
	sortableColumns = [];

	constructor(public sortSrv: SortService, private dlgCommonSrv: DialogCommonService) {}

	ngOnInit() {
		this.sortableColumns = this.getSortableColumns();
	}

	onExportClick() {
		this.dlgCommonSrv.openExportDlg(this.typename, undefined, {
			query: 'deleted == false AND archived == false',
		});
	}

	onSortClick(column: ColumnConfig) {
		this.sortSrv.toggleSort(column.sortProperty);
	}

	getSortableColumns() {
		return Object.values(this.tableConfig)
			.filter((config) => this.columns.includes(config.name))
			.filter((config) => config.sortProperty);
	}
}
