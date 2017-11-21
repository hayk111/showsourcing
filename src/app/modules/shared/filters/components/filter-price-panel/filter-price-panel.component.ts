import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName, FilterTarget } from '../../../../store/model/filter.model';
import { selectFilterValuesForCategory } from '../../../../store/selectors/filter.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FilterActions } from '../../../../store/action/filter.action';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';

@Component({
	selector: 'filter-price-panel-app',
	templateUrl: './filter-price-panel.component.html',
	styleUrls: ['./filter-price-panel.component.scss']
})
export class FilterPricePanelComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	private target = FilterTarget.prices;
	_min: number;
	_max: number;
	min$;
	max$;
	errorMsg = '';

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.min$ = this.store
			.select(selectFilterValuesForCategory(this.filterGroupName, FilterTarget.minPrices));
		this.max$ = this.store
			.select(selectFilterValuesForCategory(this.filterGroupName, FilterTarget.maxPrices));
		this.min$.takeUntil(this._destroy$)
			.subscribe(val => this._min = val);
		this.max$.takeUntil(this._destroy$)
			.subscribe(val => this._max = val);
	}

	get min() {
		return this._min;
	}

	get max() {
		return this._max;
	}

	set min(v) {
		if (v > this._max)
			this.errorMsg = 'Min must be smaller or equal to max';
		else {
			this.clearError();
			this._min = v;
		}
	}

	set max(v) {
		if (v < this._min)
			this.errorMsg = 'Max must be greater or equal to min';
		else {
			this.clearError();
			this._max = v;
		}
	}

	clearError() {
		this.errorMsg = '';
	}

	// we change value on blur to not change too often
	onBlur(minOrMax) {
		let action;
		switch (minOrMax) {
			case 'min':
				action = FilterActions
				.setFilterPrice(this.filterGroupName, FilterTarget.minPrices, this.min);
				break;
			case 'max':
				action = FilterActions
				.setFilterPrice(this.filterGroupName, FilterTarget.maxPrices, this._max);
				break;
			default:
				throw Error('Hey this should be min or max, please fix me in filter-price-panel.component');
		}
		this.store.dispatch(action);
	}
}
