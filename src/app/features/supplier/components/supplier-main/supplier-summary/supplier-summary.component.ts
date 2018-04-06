import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Supplier } from '~entity';
import { Store } from '@ngrx/store';

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
	@Output() update = new EventEmitter<any>();

	constructor(private store: Store<any>) { }

	ngOnInit() {

	}

	onStatusChange(newStatus: string) {
		this.update.emit({ propName: 'status', value: newStatus, id: this.supplier.id });
	}

	onFavorited() {
		this.update.emit({ propName: 'rating', value: 5, id: this.supplier.id });
	}

	onUnfavorited() {
		this.update.emit({ propName: 'rating', value: 1, id: this.supplier.id });
	}
}
