import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Filter, FilterType } from '~shared/filters';

@Component({
	selector: 'product-filters-app',
	templateUrl: './product-filters.component.html',
	styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent {
	view: 'BTNS' | 'BY_TYPE' = 'BTNS';
	@Input() byType;
	// filter displayed as button in the btns panel
	filterBtns = [
		FilterType.SUPPLIER,
		FilterType.CATEGORY,
		FilterType.TAG,
		FilterType.PROJECTS
	];

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
