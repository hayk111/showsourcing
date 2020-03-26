import { Component, Input, OnInit } from '@angular/core';
import { ColumnConfig } from '~common/tables/entity-table.component';

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
	@Input() currentSort: { sortBy: string, descending: boolean } = { sortBy: 'creationDate', descending: true };
	sortableColumns = [];


	constructor() {}

	ngOnInit() {
		// this.sortableColumns = this.getSortableColumns();
		// this.currentSort = this.listSrv.currentSort;
	}

	onExportClick() {
		// this.listSrv.exportAll();
	}

	onSortClick(column: ColumnConfig) {
		const isCurrentSort = this.currentSort.sortBy === column.sortProperty;
		const descending = isCurrentSort ? !this.currentSort.descending : true;
		// this.listSrv.sort({ sortBy: column.sortProperty, descending });
	}

	getSortableColumns() {
		return [];
		// return Object.values(this.tableConfig)
		// 	.filter(config => this.columns.includes(config.name))
		// 	.filter(config => config.sortProperty);
	}
}
