import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ERM, Supplier, User } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'supplier-top-card-app',
	templateUrl: './supplier-top-card.component.html',
	styleUrls: ['./supplier-top-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2'
	}
})
export class SupplierTopCardComponent extends TrackingComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() delete = new EventEmitter<Supplier>();
	@Output() export = new EventEmitter<Supplier>();
	@Output() updateFavorite = new EventEmitter<Supplier>();
	@Output() assign = new EventEmitter<User>();


	typeEntity = ERM.SUPPLIER;

	constructor(
		private location: Location
	) {
		super();
	}

	changeFavorite(isFavorited: boolean) {
		this.updateFavorite.emit({ favorite: isFavorited, ...this.supplier });
	}

	ngOnInit() {
	}

	goBack() {
		this.location.back();
	}

}
