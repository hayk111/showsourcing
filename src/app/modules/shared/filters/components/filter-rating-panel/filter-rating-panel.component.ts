import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../../../store/action/filter.action';
import { FilterGroupName, filterRepresentationMap } from '../../../../store/model/filter.model';
import { selectFilterValuesForEntity } from '../../../../store/selectors/filter.selectors';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';

@Component({
	selector: 'filter-rating-panel-app',
	templateUrl: './filter-rating-panel.component.html',
	styleUrls: ['./filter-rating-panel.component.scss']
})
export class FilterRatingPanelComponent extends AutoUnsub implements OnInit {
	ratings = [1, 2, 3, 4, 5];
	private ratingsSelected: Array<number>;
	@Input() filterGroupName: FilterGroupName;
	private repr = filterRepresentationMap.ratings;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.store.select(selectFilterValuesForEntity(this.filterGroupName, this.repr))
			.takeUntil(this._destroy$)
			.subscribe(arr => this.ratingsSelected = arr);
	}

	isSelected(num: number) {
		return ~this.ratingsSelected.indexOf(num);
	}

	getStarArray(num: number) {
		return this.ratings.slice(0, num);
	}

	onChange(event, value) {
		if (event.target.checked)
			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, this.repr, `rating: ${value}`, value));
		else
			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, this.repr, value));
	}

}
