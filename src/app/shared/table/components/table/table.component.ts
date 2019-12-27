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
import { EntityName } from '~core/models';
import { ColumnDirective } from '~shared/table/components/column.directive';
import { Sort } from '~shared/table/components/sort.interface';
import { TrackingComponent } from '~utils/tracking-component';
import { SelectionState } from '~shared/inputs-custom/components/select-checkbox/select-checkbox.component';

// Here is a stackblitz with a smaller version of the tables to understand it more easily

// https://stackblitz.com/edit/angular-vtluff?file=src/app/app.component.ts
@Component({
	selector: 'table-app',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.scrollable-y]': 'hasVerticalScroll',
		'[class.pending]': 'pending'
	}
})
export class TableComponent extends TrackingComponent implements OnChanges {
	/** whether the table is currently loading */
	@Input() pending = false;
	/** whether rows are selectable */
	@Input() hasSelection = true;
	/** whether the table rows have a contextual menu */
	@Input() hasMenu = true;
	/** whether the table has header row */
	@Input() hasHeader = true;
	/** whether the table has vertical scroll */
	@Input() hasVerticalScroll = false;
	/** the placeholder text if no element displayed in the table */
	@Input() placeholder: string;
	/** whether rows are selectable and pagination is visible */
	@Input() hasPagination = true;
	/** whether the pagination component has left and right padding of 24px */
	@Input() hasPaddingPagination;
	/** whether the pagination component has show items per page */
	@Input() hasShowItemsPerPage = true;
	/** whether there is a border around the table */
	@Input() hasBorder = true;

	@Input() footerTemplate: TemplateRef<any>;
	@Input() type: EntityName;
	@Input() width: string;
	@Input() rowHeight = 42;

	/** the name of the property than uniquely identifies a row. This is used to know if a row is currently selectioned
	so this is only useful when the table has selection enabled. */
	@Input() idName = 'id';
	/** maps of the <id, true> so we can access the items that are selected */
	@Input() selected: Map<string, boolean> = new Map();
	// TODO this should be transcluded instead
	@Input() contextualMenu: TemplateRef<any>;
	/** current sort */
	@Input() currentSort: Sort = { sortBy: 'creationDate', descending: true };
	/** total number of items for pagination */
	@Input() count = 0;

	@Input() currentPage: number;
	@Output() showItemsPerPage = new EventEmitter<number>();

	@Input() createEntityBtnName: string;
	/** event when we click the create button on placeholder */
	@Output() createClick = new EventEmitter<null>();

	/** event when we select all rows */
	@Output() selectAll = new EventEmitter<string[]>();
	@Output() unselectAll = new EventEmitter<null>();
	/** selecting one row with the checkbox */
	@Output() selectOne = new EventEmitter<string>();
	@Output() unselectOne = new EventEmitter<string>();
	/** when we scroll down to the end of the table */
	@Output() bottomReached = new EventEmitter<null>();
	@Output() sort = new EventEmitter<Sort>();
	/** when we hover and we want to get the id of the object */
	@Output() hovered = new EventEmitter<string>();
	/** pagination events */
	@Output() goToPage = new EventEmitter<number>();
	/** all the columns */
	@ContentChildren(ColumnDirective) columns: QueryList<ColumnDirective>;

	/** Different rows displayed */
	@Input() rows;
	hoverIndex: number;

	/** whether specific rows are selectable or not */
	@Input() isSelectable = (item) => true;

	/** function used by the ng for, using an arrow to not lose this context */
	trackByIdentify = (index, item) => this.identify(index, item);

	/** function used by the ng for, using an arrow to not lose this context */
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
				if (column) {
					column.sortOrder = currentSort.descending ? 'DESC' : 'ASC';
				}
			}
		}
	}

	getSelectionState(): SelectionState {
		if (!this.rows || this.rows.length === 0)
			return 'unchecked';

		if (this.selected.size === this.rows.length) {
			return 'selectedAll';
		} else if (this.selected.size === 0) {
			return 'unchecked';
		} else {
			return 'selectedPartial';
		}
	}

	generateStyles(): any {
		if (this.hasPagination) {
			return { width: this.width };
		} else {
			return { height: '100%', width: this.width};
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
		this.currentSort.sortBy = column.sortBy;
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

	goToIndexPage(page) {
		this.goToPage.emit(page);
	}
}
