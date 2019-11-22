import { EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Sort } from '~shared/table/components/sort.interface';
import { TrackingComponent } from '~utils/tracking-component';
import { ERM } from '~core/models/_erm.enum';


export interface ColumnConfig {
	// property we are accessing on the switchcase
	name: string;
	width: number;
	// this is the title of the column
	translationKey: string;
	sortProperty?: string;
	sortable?: boolean;
	// when the table is only visible on hover
	showOnHover?: boolean;
	metadata?: any;
	fixedWidth?: boolean;
}

export interface TableConfig {
	[key: string]: ColumnConfig;
}

export type TableConfigType = 'small' | 'medium' | 'big' | 'medium-small';

export abstract class EntityTableComponent<T> extends TrackingComponent implements OnInit {
	/** current selection */
	@Input() selection: Map<string, boolean>;
	/** entities displayed */
	@Input() rows: Array<T>;
	/** whether it's loading */
	@Input() pending = true;
	/** when using pagination, that's the total number of items */
	@Input() count: number;
	/** how many items were skipped (useful to display pages) */
	@Input() skipped: number;
	@Input() currentPage: number;
	@Input() currentSort: Sort;
	@Input() hasMenu = true;
	@Input() hasHeader = true;
	@Input() hasPagination = true;
	@Input() hasSelection = true;
	@Input() hasPreview = true;
	@Input() canUpdate = true;
	@Input() columns = [];
	@Input() hasMinHeight = true;
	@Input() rowHeight = 47;
	@Input() hasRequestCount = false;
	tableConfig: TableConfig = undefined;
	columnsConfig: ColumnConfig[] = [];
	// column clicks
	@Output() previewClick = new EventEmitter<T>();
	@Output() open = new EventEmitter<string>();
	// selection
	@Output() select = new EventEmitter<any>();
	@Output() unselect = new EventEmitter<any>();
	@Output() selectAll = new EventEmitter<Map<string, boolean>>();
	@Output() unselectAll = new EventEmitter<Map<string, boolean>>();
	@Output() favorited = new EventEmitter<string>();
	@Output() unfavorited = new EventEmitter<string>();
	@Output() update = new EventEmitter<T>();
	@Output() bottomReached = new EventEmitter<string>();
	@Output() sort = new EventEmitter<Sort>();
	/** emits when a click has been performed on the placeholder */
	@Output() createClick = new EventEmitter<null>();
	@Output() delete = new EventEmitter<T>();
	// pagination
	@Output() previous = new EventEmitter<undefined>();
	@Output() next = new EventEmitter<undefined>();
	@Output() goToPage = new EventEmitter<number>();
	@Output() showItemsPerPage = new EventEmitter<number>();
	/** id of the row being hovered */
	hovered: string;

	constructor() {
		super();
	}

	previousPage() {
		this.previous.emit();
	}

	nextPage() {
		this.next.emit();
	}

	ngOnInit() {
		if (!this.tableConfig) {
			throw Error('Please define a tableConfiguration for columnConfig');
		}

		this.columns.forEach(name => {
			const config = this.tableConfig[name];
			if (config) {
				this.columnsConfig.push(config);
			} else {
				throw Error(`'${name}' isn't a valid column name, make sure it is in the config`);
			}
		});
	}

}
