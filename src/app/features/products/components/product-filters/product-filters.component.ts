import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'product-filters-app',
	templateUrl: './product-filters.component.html',
	styleUrls: ['./product-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFiltersComponent implements OnInit {
	selectedSuppliers$: Observable<any>;
	/** Whether the different panel that are displayed when clicking on a button are shown */
	entityPanelShown = false;
	ratingPanelShown = false;
	pricePanelShown = false;

	constructor() { }

	ngOnInit() {
	}

	toggleEntityPanel() {
		this.entityPanelShown = !this.entityPanelShown;
	}

	togglePricePanel() {
		this.pricePanelShown = !this.pricePanelShown;
	}

	toggleRatingPanel() {
		this.ratingPanelShown = !this.ratingPanelShown;
	}
}
