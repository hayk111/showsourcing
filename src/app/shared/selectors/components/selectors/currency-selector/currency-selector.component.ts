import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyService } from '~core/entity-services';
import { Currency, ERM } from '~core/models';
import { SelectorConfig, SelectorsService } from '~shared/selectors/services/selectors.service';

import { AbstractSelectorComponent } from '../../abstract-selector.components';

@Component({
	selector: 'currency-selector-app',
	templateUrl: './currency-selector.component.html',
	styleUrls: ['./currency-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencySelectorComponent extends AbstractSelectorComponent {

	searchQuery = (text: string) => {
		return `symbol CONTAINS[c] "${text}" OR name CONTAINS[c] "${text}"`;
	}
	itemsMatchesName = (items: any[], name: string) => {
		return items.filter(item => item === name);
	}
	isStoredFn(item) {
		return !!this.value.find(value => value === item.symbol);
	}
	areStoredMatchesNameFn(name) {
		return !!this.value.find(val => val.toLowerCase() === name);
	}
	itemNotStoredFn(item) {
		return !((this.value || []).some(val => val === item.symbol));
	}
	deleteStoredItemFn(item) {
		return this.value.filter(val => val !== item.symbol);
	}
	onSelectFn(item) {
		return item.symbol;
	}

	config: SelectorConfig;

	constructor(
		protected currencySrv: CurrencyService,
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef
	) { super(selectorSrv, cd); }

	setup() {
		this.config = {
			entitySrv: this.currencySrv,
			entityMetadata: ERM.CURRENCY,
			searchQuery: this.searchQuery,
			itemsMatchesName: this.itemsMatchesName,
			itemsNotStored: this.itemsNotStored,
			areStoredMatchesName: this.areStoredMatchesName,
			initialFilters: this.filterList.asFilters(),
			initialSeachTxt: this.initialSeachTxt,
			selectParams: { sortBy: '' }
		};
		this.selectorSrv.setup(this.config);
	}

	updateSingleFn() {
		const item = this.value;
		return item;
	}

	updateMultipleFn() {
		const trimValues = this.value;
		return trimValues;
	}

	createFn(): any {
		// this entity should not be able to create
		throw Error('The currency selector is not suposed to create new ones')
	}

}
