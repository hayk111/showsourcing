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
	// whether the table is currently loading
	@Input() pending = false;
	// whether rows are selectable
	@Input() hasSelection = true;
	// whether the table rows have a contextual menu
	@Input() hasMenu = true;
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
		this.totalSections = Math.ceil(this._count / this.itemsPerPage);
		if (this.skipped)
			this.indexPagination = this.skipped / this.itemsPerPage;
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
	// total of sections obtained by the count and items per page
	totalSections = 1;
	// sideItems
	sideItems = 5;

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

	nextPage() {
		if (this.indexPagination < this.totalSections - 1) {
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
		const width = Math.min(this.sideItems * 2 + 1, this.totalSections);
		const leftIndex = Math.max(this.indexPagination - this.sideItems, 0);
		const pages = [];
		// we want to readd items from the right to the left (-1 since we don't take into account the last index)
		const rightAmount = Math.min(this.sideItems, ((this.totalSections - 1) - this.indexPagination));

		let cursor = Math.max(leftIndex - (this.sideItems - rightAmount), 0);

		while ((pages.length < width) && (cursor <= this.totalSections)) {
			pages.push(cursor);
			cursor++;
		}
		this.sections = pages.length ? pages : [0];
	}

	goToIndexPage(index) {
		this.indexPagination = index;
		this.setPageIndex();
		this.goToPage.emit(index);
	}
}
