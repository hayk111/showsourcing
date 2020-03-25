import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FilterService, FilterType } from '~core/filters';

@Component({
	selector: 'filters-app',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
	view: 'BTNS' | 'SELECTION' = 'BTNS';
	@Input() filterTypes = [];
	@Input() sidePanel = true;
	typeSelected: FilterType;

	constructor(public filterSrv: FilterService) {}

	@Output() close = new EventEmitter<undefined>();

	openEditPanel(type: FilterType) {
		this.typeSelected = type;
		this.view = 'SELECTION';
	}

	openBtnPanel() {
		this.view = 'BTNS';
	}

	addFilter(filter: Filter) {
		this.filterSrv.addFilter(filter);
	}

	removeFilter(filter: Filter) {
		this.filterSrv.removeFilter(filter);
	}

	resetAll() {
		this.filterSrv.reset();
	}

	resetType(type: FilterType) {
		this.filterSrv.removeFilterType(type);
	}
}
