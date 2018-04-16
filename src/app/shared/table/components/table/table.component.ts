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
	@Input() pending = false;

	// whether rows are selectable
	@Input() hasSelection = true;
	// whether the table will automatically do it's sorting or will rely on external sorting
	@Input() autoSort = true;
	// the name of the property than uniquely identifies a row. This is used to know if a row is currently selectioned
	// so this is only useful when the table has selection enabled.
	@Input() idName = 'id';
	// maps of the <id, true> so we can access the items that are selected
	@Input() selection = new Map<any, boolean>();
	// event when we select all rows
	@Output() selectAll = new EventEmitter<Map<any, boolean>>();
	@Output() unselectAll = new EventEmitter<Map<any, boolean>>();
	// selecting one row with the checkbox
	@Output() selectOne = new EventEmitter<string>();
	@Output() unselectOne = new EventEmitter<string>();
	// when we scroll down to the end of the table
	@Output() bottomReached = new EventEmitter<null>();
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

	// @Input() set searchedValue( value: any ) {
	// 	this.
	// }

	// function used by the ng for, using an arrow to not lose this context
	trackByFn = (index, item) => this.identify(index, item);
	// track by for column
	columnTackByFn = (index, item) => index;



	onSelectOne(id: any) {
		this.selection.set(id, true);
		this.selectOne.emit(id);
	}

	onUnselectOne(id: any) {
		this.selection.delete(id);
		this.unselectOne.emit(id);
	}

	onSelectAll() {
		// each row will be selectioned
		this.rows.forEach(row => this.selection.set(row[this.idName], true));
		this.selectAll.emit(this.selection);
	}

	onUnselectAll() {
		this.rows.forEach(row => this.selection.delete(row[this.idName]));
		this.unselectAll.emit(this.selection);
	}

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

	isAllSelected(): boolean {
		if (!this.rows || this.rows.length === 0)
			return false;
		return this.selection.size === this.rows.length;
	}

	identify(index, item) {
		return item[this.idName];
	}
}
