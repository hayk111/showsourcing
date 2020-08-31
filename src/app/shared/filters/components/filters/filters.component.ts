import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FilterService, FilterType } from '~core/filters';
import { Typename, api } from 'showsourcing-api-lib';

@Component({
	selector: 'filters-app',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
	view: 'BTNS' | 'SELECTION' = 'BTNS';
	@Input() filterTypes = [];
	@Input() sidePanel = true;
	@Input() typenameFiltered: Typename;
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
		this.filterSrv.addFilter(filter, this.typenameFiltered, this.typeSelected);
	}

	removeFilter(filter: Filter) {
		this.filterSrv.removeFilter(filter, this.typenameFiltered, this.typeSelected);
	}

	resetAll() {
		this.filterSrv.reset();
	}

	resetType(type: FilterType) {
		this.filterSrv.removeFilterType(type, this.typenameFiltered);
	}
}
