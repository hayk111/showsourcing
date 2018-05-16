import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '~models';
import { Patch } from '~app/entity';

@Component({
	selector: 'supplier-main-bottom-app',
	templateUrl: './supplier-main-bottom.component.html',
	styleUrls: ['./supplier-main-bottom.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierMainBottomComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() update = new EventEmitter<Patch>();
	constructor() { }

	ngOnInit() { }

	onUpdate(value: string) {
		this.update.emit({ propName: 'description', value, id: this.supplier.id });
	}
}
