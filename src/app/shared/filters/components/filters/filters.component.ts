import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Filter, FilterType } from '~shared/filters';

@Component({
	selector: 'filters-app',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
	view: 'BTNS' | 'SELECTION' = 'BTNS';
	@Input() byType;
	@Input() filterTypes = [];
	typeSelected: FilterType;

	constructor() { }


	openEditPanel(type: FilterType) {
		this.typeSelected = type;
		this.view = 'SELECTION';
	}

	openBtnPanel() {
		this.view = 'BTNS';
	}

	addFilter(filter: Filter) {

	}

	removeFilter(filter: Filter) {

	}

	resetAll() {

	}

	resetType(type: FilterType) {

	}
}
