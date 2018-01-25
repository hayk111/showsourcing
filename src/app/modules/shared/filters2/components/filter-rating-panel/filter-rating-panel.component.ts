import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Filter, FilterRating } from '../../../../store/model/misc/filter.model';

@Component({
	selector: 'filter-rating-panel-app',
	templateUrl: './filter-rating-panel.component.html',
	styleUrls: ['./filter-rating-panel.component.scss']
})
export class FilterRatingPanelComponent {
	@Output() addFilter = new EventEmitter<Filter>();
	@Output() removeFilter = new EventEmitter<Filter>();
	ratings = [1, 2, 3, 4, 5];
	values: Array<number> = [];

	constructor() {
	}

	isSelected(num: number) {
		return ~this.values.indexOf(num);
	}

	getStarArray(num: number) {
		return this.ratings.slice(0, num);
	}

	onChange(event, value) {
		const filter = new FilterRating(value);
		if (event.target.checked)
			this.addFilter.emit(filter);
		else
			this.removeFilter.emit(filter);
	}

	@Input()
	set selected(filters: Array<Filter>) {
		this.values = filters.map(f => f.value);
	}

}
