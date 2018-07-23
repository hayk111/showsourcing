import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Filter } from '~shared/filters/models';
import { Observable } from 'rxjs';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'filter-rating-panel-app',
	templateUrl: './filter-rating-panel.component.html',
	styleUrls: ['./filter-rating-panel.component.scss'],
})
export class FilterRatingPanelComponent {
	@Output() addFilter = new EventEmitter<Filter>();
	@Output() removeFilter = new EventEmitter<Filter>();
	values: Array<number> = [];

	constructor() { }

	isSelected(num: number) {
		return ~this.values.indexOf(num);
	}

	onChange(event, value) {
		// const filter = new FilterRating(value);
		// if (event.target.checked) this.addFilter.emit(filter);
		// else this.removeFilter.emit(filter);
	}

	@Input()
	set selected(filters: Array<Filter>) {
		this.values = filters.map(f => f.value);
	}
}
