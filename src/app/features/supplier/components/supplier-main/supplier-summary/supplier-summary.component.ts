import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Supplier } from '~models';


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

	constructor() { }

	ngOnInit() {

	}

	onStatusChange(statusId: string) {
		this.update.emit({ status: { id: statusId }, id: this.supplier.id });
	}

	onFavorited() {
		this.update.emit({ favorite: true, id: this.supplier.id });
	}

	onUnfavorited() {
		this.update.emit({ favorite: false, id: this.supplier.id });
	}
}
