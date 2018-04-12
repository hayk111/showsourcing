import {
	Output,
	Component,
	ContentChildren,
	Input,
	OnInit,
	QueryList,
	ChangeDetectionStrategy,
	EventEmitter,
} from '@angular/core';
import { ColumnDirective } from '~app/shared/table/components/column.directive';

@Component({
	selector: 'table-app',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	// whether rows are selectable
	@Input() hasSelection = true;
	// whether the table will automatically do it's sorting or will rely on external sorting
	@Input() autoSort = true;
	@Output() bottomReached = new EventEmitter<null>();
	@ContentChildren(ColumnDirective) columns: QueryList<ColumnDirective>;

	// currently sorted column
	currentSortedColumn: ColumnDirective;

	/** Different rows displayed */
	@Input() set rows(value: Array<any>) {
		this._rows = value;
		this.doSort();
	}
	get rows() {
		return this._sortedRows || this._rows;
	}
	protected _rows = [];
	protected _sortedRows = [];


	sort(column: ColumnDirective) {
		// remove sorting on all column and add the current sort to the correct one
		const currentSort = column.currentSort;
		this.columns.forEach(c => c.resetSort());
		column.toggleSort(currentSort);
		this.currentSortedColumn = column;
		if (this.autoSort)
			this.doSort();
	}

	private doSort() {
		const column = this.currentSortedColumn;
		if (!column || column.currentSort === 'none') {
			this._sortedRows = this._rows;
		} else {
			this._sortedRows = column.sort(this._rows);
		}
	}
}
