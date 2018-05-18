import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Supplier } from '~models';
import { SortEvent } from '~app/shared/table/components/sort-event.interface';

@Component({
	selector: 'supplier-list-view-app',
	templateUrl: './supplier-list-view.component.html',
	styleUrls: ['./supplier-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListViewComponent {
	@Input() selection: Map<string, boolean>;
	@Input() suppliers: Array<Supplier>;
	@Input() pending = true;
	@Output() supplierSelect = new EventEmitter<string>();
	@Output() supplierUnselect = new EventEmitter<string>();
	@Output() supplierSelectAll = new EventEmitter<Map<string, boolean>>();
	@Output() supplierUnselectAll = new EventEmitter<Map<string, boolean>>();
	@Output() supplierOpen = new EventEmitter<string>();
	@Output() supplierFavorited = new EventEmitter<string>();
	@Output() supplierUnfavorited = new EventEmitter<string>();
	@Output() bottomReached = new EventEmitter<string>();
	@Output() sort = new EventEmitter<SortEvent>();
	// used to sort by tags or by categories
	arrayComparator = (a, b) => (b || []).length - (a || []).length;

	constructor() { }


}
