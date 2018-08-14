import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Supplier, ERM } from '~models';


@Component({
	selector: 'supplier-summary-app',
	templateUrl: './supplier-summary.component.html',
	styleUrls: ['./supplier-summary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierSummaryComponent implements OnInit {
	@Input() supplier: Supplier;
	@Input() productCount: number;
	@Input() taskCount: number;
	@Input() contactCount: number;
	@Output() update = new EventEmitter<Supplier>();
	suppERM = ERM.SUPPLIER;

	constructor() { }

	ngOnInit() {
	}

	onStatusChange(statusId: string) {
		// when changing we status we put the new status at the beginning of the array.
		this.update.emit({ statuses: [{ id: statusId }, ...this.supplier.statuses], id: this.supplier.id });
	}

	onFavorited() {
		this.update.emit({ favorite: true, id: this.supplier.id });
	}

	onUnfavorited() {
		this.update.emit({ favorite: false, id: this.supplier.id });
	}
}
