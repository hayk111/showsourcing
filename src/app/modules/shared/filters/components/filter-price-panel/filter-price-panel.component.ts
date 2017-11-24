import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName, entityRepresentationMap } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FilterActions } from '../../../../store/action/filter.action';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { selectFilterValuesForEntity } from '../../../../store/selectors/filter.selectors';
import Log from '../../../../../utils/logger/log.class';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

@Component({
	selector: 'filter-price-panel-app',
	templateUrl: './filter-price-panel.component.html',
	styleUrls: ['./filter-price-panel.component.scss']
})
export class FilterPricePanelComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	private target = entityRepresentationMap.prices;
	// filters are saved as this when sent
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
			.select(selectFilterValuesForEntity(this.filterGroupName, this.minRepr))
			.pipe(distinctUntilChanged());
		let prevMin;
		this.max$ = this.store
			.select(selectFilterValuesForEntity(this.filterGroupName, this.maxRepr))
			.pipe(distinctUntilChanged());
		this.min$.takeUntil(this._destroy$)
			.subscribe(val => {
				Log.debug(prevMin === val);
				Log.debug(val, prevMin);
				prevMin = val;
				Log.debug(`price filter panel, receiving min val: ${val[0]}`);
				if (val[0] !== undefined)
					this._min = val[0];
			});
		this.max$.takeUntil(this._destroy$)
			.subscribe(val => {
				Log.debug(`price filter panel, receiving max val: ${val[0]}`);
				if (val[0] !== undefined)
					this._max = val[0];
			});
	}

	get min() {
		return this._min;
	}

	get max() {
		return this._max;
	}

	set min(v) {
		if (v > this._max && this._max !== undefined)
			this.errorMsg = 'Min must be smaller or equal to max';
		else {
			this.clearError();
			this._min = v;
		}
	}

	set max(v) {
		Log.debug('filter price panel component: setting max ', v);
		if (v < this._min )
			this.errorMsg = 'Max must be greater or equal to min';
		else {
			this.clearError();
			this._max = v;
		}
	}

	sendActions() {
		const arr = [entityRepresentationMap.maxPrices, entityRepresentationMap.minPrices ];
		this.store.dispatch(FilterActions.removeFiltersForEntityReprs(this.filterGroupName, arr));

		if (this._min !== undefined) {
			const minaction = FilterActions
			.addFilter(this.filterGroupName, this.minRepr, `min: ${this._min}`, this._min);
			this.store.dispatch(minaction);
		}
		if (this._max !== undefined) {
			const maxaction = FilterActions
			.addFilter(this.filterGroupName, this.maxRepr, `max: ${this._max}`, this._max);
			this.store.dispatch(maxaction);
		}

	}

	clearError() {
		this.errorMsg = '';
	}

}
