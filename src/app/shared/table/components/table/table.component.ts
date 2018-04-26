import {
	Output,
	Component,
	ContentChildren,
	Input,
	OnInit,
	QueryList,
	ChangeDetectionStrategy,
	EventEmitter,
	HostBinding,
} from '@angular/core';
import { ColumnDirective } from '~app/shared/table/components/column.directive';
import { Sort } from '~app/entity/utils/api-params.interface';
import { SortEvent } from '~app/shared/table/components/sort-event.interface';

@Component({
	selector: 'table-app',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'fullWidth'
	}
})
export class TableComponent {
	// whether the table is currently loading
	@Input() pending = false;
	// whether rows are selectable
	@Input() hasSelection = true;
	// whether the table will automatically do it's sorting or will rely on external sorting
	@Input() autoSort = false;
	// the name of the property than uniquely identifies a row. This is used to know if a row is currently selectioned
	// so this is only useful when the table has selection enabled.
	@Input() idName = 'id';
	// maps of the <id, true> so we can access the items that are selected
	// we accept map and array but we transform those always to map
	@Input() set selection(value: any) {
		if (value instanceof Map) {
			this._selected = value;
		} else if (Array.isArray(value)) {
			this._selected = new Map();
			value.forEach(val => this._selected.set(val, true));
		}
	}
	get selected(): Map<any, boolean> { return this._selected; }
	protected _selected: Map<any, boolean> = new Map();
	// event when we select all rows
	@Output() selectAll = new EventEmitter<null>();
	@Output() unselectAll = new EventEmitter<null>();
	// selecting one row with the checkbox
	@Output() selectOne = new EventEmitter<string>();
	@Output() unselectOne = new EventEmitter<string>();
	// when we scroll down to the end of the table
	@Output() bottomReached = new EventEmitter<null>();
	@Output() sort = new EventEmitter<SortEvent>();
	// all the columns
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

	// function used by the ng for, using an arrow to not lose this context
	trackByFn = (index, item) => this.identify(index, item);

	// track by for column
	columnTackByFn = (index, item) => index;

	onSelectOne(id: any) {
		this.selectOne.emit(id);
	}

	onUnselectOne(id: any) {
		this.unselectOne.emit(id);
	}

	onSelectAll() {
		this.selectAll.emit();
	}

	onUnselectAll() {
		this.unselectAll.emit();
	}

	onSort(column: ColumnDirective) {
		// remove sorting on all column and add the current sort to the correct one
		const currentSort = column.currentSort;
		this.columns.forEach(c => c.resetSort());
		column.toggleSort(currentSort);
		// current sort can only be ASC or DESC at that point but the type of current sort is 'ASC' | 'DESC' | 'NONE'
		this.sort.emit({ sortBy: column.sortWith, sortOrder: (column.currentSort as 'ASC' | 'DESC') });
		this.currentSortedColumn = column;
		if (this.autoSort)
			this.doSort();
	}

	private doSort() {
		const column = this.currentSortedColumn;
		if (!column || column.currentSort === 'NONE') {
			this._sortedRows = this._rows;
		} else {
			this._sortedRows = column.sort(this._rows);
		}
	}

	isAllSelected(): boolean {
		if (!this.rows || this.rows.length === 0)
			return false;
		return this._selected.size === this.rows.length;
	}

	identify(index, item) {
		return item[this.idName];
	}

}
