import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Supplier, Patch } from '~app/entity';


@Component({
	selector: 'supplier-main-header-app',
	templateUrl: './supplier-main-header.component.html',
	styleUrls: ['./supplier-main-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierMainHeaderComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() update = new EventEmitter<Patch>();
	constructor() { }

	ngOnInit() { }

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
