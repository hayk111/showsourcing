import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { AutoUnsub } from '~utils/index';
import { Log } from '~utils/index';
import { distinctUntilChanged } from 'rxjs/operators';
import { Currency } from '~models'
import { Filter } from '../../models';

// panel used for prices filtering
@Component({
	selector: 'filter-price-panel-app',
	templateUrl: './filter-price-panel.component.html',
	styleUrls: ['./filter-price-panel.component.scss']
})
export class FilterPricePanelComponent {
	min: number;
	max: number;
	currency: Currency;

	@Output() addFilter = new EventEmitter<Filter>();
	@Output() removeFilterClass = new EventEmitter<any>();

	@Input()
	set selected(filters: Array<any>) {
		// there should be at most one filterprice at a time
		this.min = filters[0] !== undefined ? undefined : filters[0].min;
		this.min = filters[0] !== undefined ? undefined : filters[0].max;
		this.currency = filters[0] !== undefined ? undefined : filters[0].currency;
	}

	onChange() {
		// const filter = new FilterPrice(this.currency, this.min, this.max);
		// // when we add a filter we will also remove price filters in the parent
		// this.removeFilterClass.emit(FilterPrice);
		// this.addFilter.emit(filter);
	}

	onCurrencyChange(value: Currency) {
		this.currency = value;
		this.onChange();
	}

}
