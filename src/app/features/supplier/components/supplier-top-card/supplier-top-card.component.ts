import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Supplier } from '~models/supplier.model';
import { Location } from '@angular/common';
import { ERM } from '~models';
import { BaseComponent } from '~shared/base-component/base-component';

@Component({
	selector: 'supplier-top-card-app',
	templateUrl: './supplier-top-card.component.html',
	styleUrls: ['./supplier-top-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2'
	}
})
export class SupplierTopCardComponent extends BaseComponent implements OnInit {
	@Input() supplier: Supplier;
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
