import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName, entityRepresentationMap } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FilterActions } from '../../../../store/action/filter.action';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { selectFilterValuesForEntity } from '../../../../store/selectors/filter.selectors';

@Component({
	selector: 'filter-price-panel-app',
	templateUrl: './filter-price-panel.component.html',
	styleUrls: ['./filter-price-panel.component.scss']
})
export class FilterPricePanelComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	private target = entityRepresentationMap.prices;
	private minRepr = entityRepresentationMap.minPrices;
	private maxRepr = entityRepresentationMap.maxPrices;
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
			.select(selectFilterValuesForEntity(this.filterGroupName, this.minRepr));
		this.max$ = this.store
			.select(selectFilterValuesForEntity(this.filterGroupName, this.maxRepr));
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
			const action = FilterActions
			.setFilterPrice(this.filterGroupName, this.minRepr, this.min);
			this.store.dispatch(action);
		}
	}

	set max(v) {
		if (v < this._min)
			this.errorMsg = 'Max must be greater or equal to min';
		else {
			this.clearError();
			this._max = v;
			const action = FilterActions
			.setFilterPrice(this.filterGroupName, this.maxRepr, this._max);
			this.store.dispatch(action);
		}
	}

	clearError() {
		this.errorMsg = '';
	}

}
