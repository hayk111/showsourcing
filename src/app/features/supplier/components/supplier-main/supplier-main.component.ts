import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'supplier-main-app',
	templateUrl: './supplier-main.component.html',
	styleUrls: ['./supplier-main.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2 mg-m border-radius'
	}
})
export class SupplierMainComponent extends TrackingComponent implements OnInit {
	@Input() supplier: Supplier;
	@Input() productCount: number;
	@Input() taskCount: number;
	@Input() contactCount: number;
	@Output() update = new EventEmitter<Supplier>();

	constructor() {
		super();
	}

	ngOnInit() { }
}
