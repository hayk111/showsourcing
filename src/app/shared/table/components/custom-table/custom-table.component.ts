import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TableDescriptor } from '~shared/table';
import { Sort } from '~shared/table/components/sort.interface';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'custom-table-app',
	templateUrl: './custom-table.component.html',
	styleUrls: ['./custom-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent extends TrackingComponent {
	@Input() currentSort: Sort;
	@Input() placeholder: string;
	@Output() bottomReached = new EventEmitter<any>();
	@Output() sort = new EventEmitter<Sort>();
	@Input() descriptor: TableDescriptor = [];
	@Input() contextualMenu: TemplateRef<any>;
	@Input() rows: Array<any> = [];
	@Input() pending: boolean;
	// maps of the <id, true> so we can access the items that are selected
	@Input() selected: Map<string, boolean> = new Map();
	@Output() selectOne = new EventEmitter<string>();
	@Output() unselectOne = new EventEmitter<string>();
	@Output() selectAll = new EventEmitter<string[]>();
	@Output() unselectAll = new EventEmitter<null>();
	@Output() previous = new EventEmitter<null>();
	@Output() next = new EventEmitter<null>();

	constructor() {
		super();
	}

}
