import { EventEmitter, Input, Output } from '@angular/core';
import { Sort } from '~shared/table/components/sort.interface';
import { TrackingComponent } from '~utils/tracking-component';


export class ListViewComponent<T> extends TrackingComponent {
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


	constructor() {
		super();
	}

	previousPage() {
		this.previous.emit();
	}

	nextPage() {
		this.next.emit();
	}

}
