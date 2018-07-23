import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Supplier } from '~models/supplier.model';
import { Location } from '@angular/common';

@Component({
	selector: 'supplier-top-card-app',
	templateUrl: './supplier-top-card.component.html',
	styleUrls: ['./supplier-top-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2'
	}
})
export class SupplierTopCardComponent implements OnInit {
	@Input() supplier: Supplier;
	constructor(
		private location: Location
	) { }

	ngOnInit() {
	}

	goBack() {
		this.location.back();
	}

}
