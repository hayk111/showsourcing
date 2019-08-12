import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, OnChanges } from '@angular/core';
import { TableDescriptor } from '~shared/table';
import { Sort } from '~shared/table/components/sort.interface';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'custom-table-app',
	templateUrl: './custom-table.component.html',
	styleUrls: ['./custom-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent extends TrackingComponent implements OnChanges {
	@Input() currentSort: Sort;
	@Input() placeholder: string;
	@Input() width: number;
	@Output() bottomReached = new EventEmitter<any>();
	@Output() sort = new EventEmitter<Sort>();
	@Input() descriptor: TableDescriptor = [];
	@Input() contextualMenu: TemplateRef<any>;
	@Input() rows: Array<any> = [];
	@Input() pending: boolean;
	@Input() hasMenu = true;
	/** total number of items for pagination */
	@Input() count = 0;

	// maps of the <id, true> so we can access the items that are selected
	@Input() selected: Map<string, boolean> = new Map();
	@Input() currentPage: number;
	@Output() selectOne = new EventEmitter<string>();
	@Output() unselectOne = new EventEmitter<string>();
	@Output() selectAll = new EventEmitter<string[]>();
	@Output() unselectAll = new EventEmitter<null>();
	// pagination events
	@Output() previous = new EventEmitter<undefined>();
	@Output() next = new EventEmitter<undefined>();
	@Output() goToPage = new EventEmitter<number>();

	constructor() {
		super();
	}

}
