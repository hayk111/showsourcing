import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { entityStateToArray, EntityState } from '../../../../store/utils/entities.utils';
import { Supplier } from '../../../../store/model/entities/supplier.model';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';

@Component({
	selector: 'supplier-list-view-app',
	templateUrl: './supplier-list-view.component.html',
	styleUrls: ['./supplier-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierListViewComponent implements OnInit {
	@Input() suppliers: Array<Supplier> = [];
	@Input() selections: Map<string, boolean>;
	@Output() supplierSelect = new EventEmitter<string>();
	@Output() supplierUnselect = new EventEmitter<string>();
	@Output() supplierOpen = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

	onSelect(event, id: string) {
		if (event.target.checked) {
			this.supplierSelect.emit(id);
		} else {
			this.supplierUnselect.emit(id);
		}
		event.stopPropagation();
	}
}
