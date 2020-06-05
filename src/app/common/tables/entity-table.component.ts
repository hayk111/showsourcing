import { EventEmitter, HostBinding, Input, OnInit, Output, Directive } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';


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

interface PropertyUpdate {
	entityId: string;
	entityType: string;
	value: any;
}

export type TableConfigType = 'small' | 'medium' | 'big' | 'medium-small';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class EntityTableComponent<T> extends TrackingComponent implements OnInit {
	// Config
	@Input() columns = [];
	@Input() hasRequestCount = false;
	tableConfig: TableConfig = undefined;
	columnsConfig: ColumnConfig[] = [];
	// Data
	@Input() selection: Map<string, boolean>;
	@Input() rows: Array<T>;
	@Input() pending = true;
	@Input() skipped: number;
	@Input() canUpdate = true;
	@Input() isFiltering = false;
	// VIEW
	@Input() hasMenu = true;
	@Input() hasHeader = true;
	@Input() hasPagination = true;
	@Input() hasSelection = true;
	@Input() hasPreview = true;
	@Input() hasBorder = true;
	@Input() hasShowItemsPerPage = true;
	@Input() hasMinHeight = true;
	@Input() listView = false;
	@Input() rowHeight = 47;
	@Input() createEntityBtnName: string;

	// column clicks
	@Output() previewClick = new EventEmitter<T>();
	@Output() open = new EventEmitter<string>();
	// selection
	@Output() select = new EventEmitter<any>();
	@Output() unselect = new EventEmitter<any>();
	@Output() selectAll = new EventEmitter<Map<string, boolean>>();
	@Output() unselectAll = new EventEmitter<Map<string, boolean>>();
	@Output() update = new EventEmitter<T>();
	@Output() propertyUpdated = new EventEmitter<PropertyUpdate>();
	@Output() bottomReached = new EventEmitter<string>();
	/** emits when a click has been performed on the placeholder */
	@Output() createClick = new EventEmitter<null>();
	@Output() delete = new EventEmitter<T>();
	@Output() archive = new EventEmitter<T>();
	// pagination
	@HostBinding('class.entity-table') entityTableClass = true;
	/** id of the row being hovered */
	hovered: string;

	constructor() {
		super();
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
