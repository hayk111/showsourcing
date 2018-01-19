import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../../../store/action/filter.action';
import { FilterGroupName, Filter, FilterRating } from '../../../../store/model/filter.model';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';

@Component({
	selector: 'filter-rating-panel-app',
	templateUrl: './filter-rating-panel.component.html',
	styleUrls: ['./filter-rating-panel.component.scss']
})
export class FilterRatingPanelComponent {
	@Input() selected: Array<number> = [];
	@Output() addFilter = new EventEmitter<Filter>();
	@Output() removeFilter = new EventEmitter<Filter>();
	ratings = [1, 2, 3, 4, 5];

	constructor() {
	}

	isSelected(num: number) {
		return ~this.selected.indexOf(num);
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

}
