import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	Output,
	QueryList,
	TemplateRef,
} from '@angular/core';
import { DEFAULT_TAKE_PAGINATION } from '~core/entity-services/_global/select-params';
import { ColumnDirective } from '~shared/table/components/column.directive';
import { Sort } from '~shared/table/components/sort.interface';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'table-app',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'fullWidth'
	}
})
export class TableComponent extends TrackingComponent implements OnChanges {
	// display the dot option
	@Input() dotsOption = true;
	// whether the table is currently loading
	@Input() pending = false;
	// whether rows are selectable
	@Input() hasSelection = true;
	// whether the table rows have a contextual menu
	@Input() hasMenu = true;
	// whether selection is disabled
	@Input() selectionDisabled = false;
	// the placeholder text if no element displayed in the table
	@Input() placeholder: string;
	// the name of the property than uniquely identifies a row. This is used to know if a row is currently selectioned
	// so this is only useful when the table has selection enabled.
	@Input() idName = 'id';
	// maps of the <id, true> so we can access the items that are selected
	@Input() selected: Map<string, boolean> = new Map();
	@Input() contextualMenu: TemplateRef<any>;
	// current sort
	@Input() currentSort: Sort;
	/** total number of items for pagination */
	@Input()
	set count(count: number) {
		this._count = count;
		const numberSections = Math.ceil(this._count / this.itemsPerPage);
		this.sections = Array(numberSections).fill(0).map((x, i) => i);
		this.setPageIndex();
	}
	get count() {
		return this._count;
	}
	private _count = 0;
	/** how many items were skipped so we can display the pages */
	@Input() skipped: number;

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
	// pagination events
	@Output() previous = new EventEmitter<undefined>();
	@Output() next = new EventEmitter<undefined>();
	@Output() goToPage = new EventEmitter<number>();
	// all the columns
	@ContentChildren(ColumnDirective) columns: QueryList<ColumnDirective>;
	// currently sorted column
	currentSortedColumn: ColumnDirective;
	// how many pages our pagination will have
	sections: Array<number> = [0];
	// items that we will see per page
	itemsPerPage = DEFAULT_TAKE_PAGINATION;
	// current index of the pagination
	indexPagination = 0;
	// this index allows us to track which is the most left item that we display
	leftIndex = 0;
	// this index allows us to track which is the most right item that we display
	rightIndex = 0;

	/** Different rows displayed */
	@Input() rows;
	hoverIndex: number;

	contextualMenuOpened = {};

	// whether specific rows are selectable or not
	@Input() isSelectable = (item) => true;

	// function used by the ng for, using an arrow to not lose this context
	trackByIdentify = (index, item) => this.identify(index, item);

	// track by for column
	columnTrackByFn = (index: any) => index;

	constructor() {
		super();
	}

	ngOnChanges(changes) {
		if (changes.currentSort && changes.currentSort.currentValue) {
			const currentSort = changes.currentSort.currentValue;
			if (this.columns) {
				this.columns.forEach(c => c.resetSort());
				const column = this.columns.find(c => c.sortBy === currentSort.sortBy);
				column.sortOrder = currentSort.descending ? 'DESC' : 'ASC';
			}
		}
	}

	onSelectOne(entity: any) {
		this.selectOne.emit(entity);
	}

	onUnselectOne(entity: any) {
		this.unselectOne.emit(entity);
	}

	onSelectAll(rows: any[]) {
		this.selectAll.emit(rows);
	}

	onUnselectAll() {
		this.unselectAll.emit();
	}

	onSort(column: ColumnDirective) {
		if (!column.sortable)
			return;
		// remove sorting on all column and add the current sort to the correct one
		const filtered = this.columns.filter(c => c !== column);
		filtered.forEach(c => c.resetSort());
		column.toggleSort();
		// current sort can only be ASC or DESC at that point but the type of current sort is 'ASC' | 'DESC' | 'NONE'
		this.sort.emit({
			sortBy: column.sortBy,
			descending: column.sortOrder === 'DESC'
		});
		this.currentSortedColumn = column;
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

	isSelected(row) {
		if (!this.hasSelection)
			return false;

		if (this.selected)
			return this.selected.has(row.id);

		throw Error(`Selection Input is undefnied`);
	}

	onToggleContextualMenu(event, i, display = true) {
		Object.keys(this.contextualMenuOpened).forEach(key => {
			this.contextualMenuOpened[key] = false;
		});
		this.contextualMenuOpened[i] = display;
		event.stopPropagation();
	}

	@HostListener('window:click', ['event'])
	onClickWindow() {
		Object.keys(this.contextualMenuOpened).forEach(key => {
			this.contextualMenuOpened[key] = false;
		});
	}

	/** returns if the index should be hidden or not */
	isHidden(index) {
		return index < this.leftIndex || index > this.rightIndex;
	}

	nextPage() {
		if (this.indexPagination < this.sections.length - 1) {
			this.indexPagination++;
			this.setPageIndex();
			this.next.emit();
		}
	}

	previousPage() {
		if (this.indexPagination > 0) {
			this.indexPagination--;
			this.setPageIndex();
			this.previous.emit();
		}
	}

	setPageIndex() {
		// the amount of items will be right and left of the selected item
		// e.g. < Previous  1 2 3 4 IND 6 7 8 9 Next > where IND is the current index and sideItems is 4
		const sideItems = 5;
		let leftIndex = 0;
		let offsetLeft = this.indexPagination - sideItems;
		// if we haven't stepped the left boundaries, we use this index and reset the offset
		// if we have stepped the boundaries,
		// we need the offset to add it to the right index if possible to keep the size of the pagination the same
		// < Previous 1 IND 3 4 5 6 7 8 9 Next > the index is not at the center cause it's not possible
		if (offsetLeft > 0) {
			leftIndex = offsetLeft;
			offsetLeft = 0;
		}
		let rightIndex = this.sections.length - 1;
		// if we have an offsetLeft we add it
		const offsetRight = this.indexPagination + sideItems + Math.abs(offsetLeft);
		// < Previous 5 6 7 8 9 10 IND 12 13 Next > the offsetRight is bigger than our pagination size
		// this means that if the left index is not 0 (the start one), we will try to add it to the left
		if (offsetRight > rightIndex && leftIndex > 0) {
			const diff = offsetRight - rightIndex;
			// if the difference is negative it means that we just need to set the minimum index on the left, 0
			leftIndex = leftIndex - diff > 0 ? leftIndex - diff : 0;
		}
		rightIndex = Math.min(offsetRight, rightIndex);

		this.leftIndex = leftIndex;
		this.rightIndex = rightIndex;
	}

	goToIndexPage(index) {
		this.indexPagination = index;
		this.setPageIndex();
		this.goToPage.emit(index);
	}
}
