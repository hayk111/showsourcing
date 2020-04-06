import { Component, Input, OnInit } from '@angular/core';
import { ColumnConfig } from '~common/tables/entity-table.component';
import { SortService } from '~shared/table/services/sort.service';

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
	sortableColumns = [];


	constructor(public sortSrv: SortService) {}

	ngOnInit() {
		this.sortableColumns = this.getSortableColumns();
	}

	onExportClick() {
		// this.listSrv.exportAll();
	}

	onSortClick(column: ColumnConfig) {
		this.sortSrv.toggleSort(column.sortProperty);
	}

	getSortableColumns() {
		return Object.values(this.tableConfig)
			.filter(config => this.columns.includes(config.name))
			.filter(config => config.sortProperty);
	}
}
