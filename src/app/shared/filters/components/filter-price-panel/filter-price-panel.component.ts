import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FilterActions } from '../../store/actions';
import { AutoUnsub } from '~utils/index';
import { Log } from '~utils/index';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { entityRepresentationMap } from '~store/utils/entities.utils';
import { FilterPrice, Filter, FilterClass } from '../../models';
import { Currency, defaultCurrency } from '~store/model/entities/currency.model';

// panel used for prices filtering
@Component({
	selector: 'filter-price-panel-app',
	templateUrl: './filter-price-panel.component.html',
	styleUrls: ['./filter-price-panel.component.scss']
})
export class FilterPricePanelComponent {
	min: number;
	max: number;
	currency: Currency = defaultCurrency;

	@Output() addFilter= new EventEmitter<Filter>();
	@Output() removeFilterClass = new EventEmitter<FilterClass>();

	@Input()
	set selected(filters: Array<FilterPrice>) {
		// there should be at most one filterprice at a time
		this.min = filters[0] !== undefined ? undefined : filters[0].min;
		this.min = filters[0] !== undefined ? undefined : filters[0].max;
		this.currency = filters[0] !== undefined ? undefined : filters[0].currency;
	}

	onChange() {
		const filter = new FilterPrice(this.currency, this.min, this.max);
		// when we add a filter we will also remove price filters in the parent
		this.removeFilterClass.emit(FilterPrice);
		this.addFilter.emit(filter);
	}

	onCurrencyChange(value: Currency) {
		this.currency = value;
		this.onChange();
	}

}
