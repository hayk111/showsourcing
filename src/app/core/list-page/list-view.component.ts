import { EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Sort } from '~shared/table/components/sort.interface';
import { TrackingComponent } from '~utils/tracking-component';


export interface ColumnConfig {
	title: string;
	width: number;
	translationKey: string;
	sortProperty?: string;
	sortable?: boolean;
}

export interface TableConfig {
	[key: string]: ColumnConfig;
}

export abstract class ListViewComponent<T> extends TrackingComponent implements OnInit {
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
	tableConfig: TableConfig = undefined;
	columnsConfig: ColumnConfig[] = [];
	@Output() select = new EventEmitter<any>();
	@Output() unselect = new EventEmitter<any>();
	@Output() selectAll = new EventEmitter<Map<string, boolean>>();
	@Output() unselectAll = new EventEmitter<Map<string, boolean>>();
	@Output() open = new EventEmitter<string>();
	@Output() favorited = new EventEmitter<string>();
	@Output() unfavorited = new EventEmitter<string>();
	@Output() update = new EventEmitter<T>();
	@Output() bottomReached = new EventEmitter<string>();
	@Output() sort = new EventEmitter<Sort>();
	@Output() previewClick = new EventEmitter<T>();
	@Output() delete = new EventEmitter<T>();
	// pagination
	@Output() previous = new EventEmitter<undefined>();
	@Output() next = new EventEmitter<undefined>();
	@Output() goToPage = new EventEmitter<number>();


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
			throw Error('Please define a configuration for columnConfig');
		}
		this.columns.forEach(name => {
			const config = this.tableConfig[name];
			if (config) {
				this.columnsConfig.push(config);
			} else {
				throw Error(`${name} isn't a valid column name, make sure it is in the config`);
			}
		});
	}

}
