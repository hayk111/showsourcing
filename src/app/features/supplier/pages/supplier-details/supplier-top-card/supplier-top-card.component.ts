import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ERM, Supplier } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'supplier-top-card-app',
	templateUrl: './supplier-top-card.component.html',
	styleUrls: ['./supplier-top-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierTopCardComponent extends TrackingComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() delete = new EventEmitter<Supplier>();
	@Output() archive = new EventEmitter<Supplier>();
	@Output() export = new EventEmitter<Supplier>();
	@Output() contact = new EventEmitter<Supplier>();

	typeEntity = ERM.SUPPLIER;

	constructor(
		private location: Location
	) {
		super();
	}


	ngOnInit() {
	}

	goBack() {
		this.location.back();
	}

}
