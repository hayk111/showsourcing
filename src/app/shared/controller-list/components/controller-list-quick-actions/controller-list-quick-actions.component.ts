import { ChangeDetectionStrategy, Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { ColumnConfig } from '~core/list-page';

@Component({
	selector: 'controller-list-quick-actions-app',
	templateUrl: './controller-list-quick-actions.component.html',
	styleUrls: ['./controller-list-quick-actions.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerListQuickActionsComponent implements OnInit {
	@Input() hasSort = true;
	@Input() tableConfig: ColumnConfig[] = [];
	@Input() columns: string[];
	@Input() currentSort: { sortBy: string, descending: boolean };
	sortableColumns = [];
	@Output() export = new EventEmitter();
	@Output() sort = new EventEmitter();

	ngOnInit() {
		this.sortableColumns = this.getSortableColumns();
	}

	onSortClick(column: ColumnConfig) {
		const isCurrentSort = this.currentSort.sortBy === column.sortProperty;
		const descending = isCurrentSort ? !this.currentSort.descending : true;
		this.sort.emit({ sortBy: column.sortProperty, descending });
	}

	getSortableColumns() {
		return Object.values(this.tableConfig)
			.filter(config => this.columns.includes(config.name))
			.filter(config => config.sortProperty);
	}
}
