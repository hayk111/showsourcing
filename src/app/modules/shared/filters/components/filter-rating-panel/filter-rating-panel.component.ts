import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../../../store/action/filter.action';
import { FilterGroupName, FilterTarget } from '../../../../store/model/filter.model';

@Component({
	selector: 'filter-rating-panel-app',
	templateUrl: './filter-rating-panel.component.html',
	styleUrls: ['./filter-rating-panel.component.scss']
})
export class FilterRatingPanelComponent implements OnInit {
	ratings = [1, 2, 3, 4, 5];
	@Input() filterGroupName: FilterGroupName;

	constructor(private store: Store<any>) { }

	ngOnInit() {

	}

	getStarArray(num: number) {
		return this.ratings.slice(0, num);
	}

	onChange(event, value) {
		if (event.checked)
			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, FilterTarget.ratings, `rating: ${value}`, value));
		else
			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, FilterTarget.ratings, value));
	}

}
