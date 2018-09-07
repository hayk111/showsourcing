import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Filter, FilterType, FilterList } from '~shared/filters/models';

@Component({
	selector: 'filters-app',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
	view: 'BTNS' | 'SELECTION' = 'BTNS';
	@Input() filterList: FilterList;
	@Input() filterTypes = [];
	typeSelected: FilterType;


	openEditPanel(type: FilterType) {
		this.typeSelected = type;
		this.view = 'SELECTION';
	}

	openBtnPanel() {
		this.view = 'BTNS';
	}

	addFilter(filter: Filter) {
		this.filterList.addFilter(filter);
	}

	removeFilter(filter: Filter) {
		this.filterList.removeFilter(filter);
	}

	resetAll() {
		this.filterList.resetAll();
	}

	resetType(type: FilterType) {
		this.filterList.removeFilterType(type);
	}
}
