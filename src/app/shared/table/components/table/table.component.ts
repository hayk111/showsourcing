import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	EventEmitter,
	HostListener,
	Input,
	Output,
	QueryList,
	TemplateRef,
} from '@angular/core';
import { ColumnDirective } from '~shared/table/components/column.directive';
import { Sort } from '~shared/table/components/sort.interface';

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
	@Input() selected: Map<string, boolean> = new Map();
	@Input() contextualMenu: TemplateRef<any>;
	// event when we select all rows
	@Output() selectAll = new EventEmitter<string[]>();
	@Output() unselectAll = new EventEmitter<null>();
	// selecting one row with the checkbox
	@Output() selectOne = new EventEmitter<string>();
	@Output() unselectOne = new EventEmitter<string>();
	// when we scroll down to the end of the table
	@Output() bottomReached = new EventEmitter<null>();
	@Output() sort = new EventEmitter<Sort>();
	// when we hover and we want to get the id of the object
	@Output() hovered = new EventEmitter<string>();
	// all the columns
	@ContentChildren(ColumnDirective) columns: QueryList<ColumnDirective>;
	// currently sorted column
	currentSortedColumn: ColumnDirective;


	/** Different rows displayed */
	@Input() set rows(value: Array<any>) {
		this._rows = value;
		if (this.autoSort)
			this.doSort();
	}
	get rows() {
		return this._sortedRows || this._rows;
	}
	protected _rows = [];
	protected _sortedRows;
	hoverIndex: number;

	contextualMenuOpened = {};

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

	onSelectAll(ids: Array<any>) {
		this.selectAll.emit(ids.map(m => m.id));
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
		return this.selected.size === this.rows.length;
	}

	identify(index, item) {
		return item[this.idName];
	}

	hoverRow(index: number) {
		this.hoverIndex = index;
		// if we have a positive index, extract id of the row entity
		const idEmit = index >= 0 ? this.rows[index][this.idName] : index;
		this.hovered.emit(idEmit);
	}

	isSelected(row, index: number) {
		// console.log('row = ', row);
		// console.log('>> selected = ', this.selected);
		return this.selected.has(row.id);
		// return false;
	}

	onToggleContextualMenu(event, i, display = true) {
		Object.keys(this.contextualMenuOpened).forEach(key => {
			this.contextualMenuOpened[key] = false;
		});
		this.contextualMenuOpened[i] = display;
		event.stopPropagation();
	}

	@HostListener('window:click', ['event'])
	onClickWindow(event) {
		Object.keys(this.contextualMenuOpened).forEach(key => {
			this.contextualMenuOpened[key] = false;
		});
	}

}
