import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Filter } from '~shared/filters';

@Component({
	selector: 'app-product-filters',
	templateUrl: './product-filters.component.html',
	styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent {
	view: 'BTNS' | 'BY_TYPE' = 'BTNS';

	constructor() { }


	openByTypePanel(obj: any) {

	}

	openBtnPanel() {

	}

	addFilter(filter: Filter) {

	}

	removeFilter(filter: Filter) {

	}

	resetAll() {

	}

	resetType() {

	}
}
