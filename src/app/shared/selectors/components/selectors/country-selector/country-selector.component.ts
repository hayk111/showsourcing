import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CountryService } from '~core/entity-services/country/country.service';
import { ERM } from '~core/models';
import { SelectorConfig, SelectorsService } from '~shared/selectors/services/selectors.service';

import { AbstractSelectorComponent } from '../../abstract-selector.components';


@Component({
	selector: 'country-selector-app',
	templateUrl: './country-selector.component.html',
	styleUrls: ['./country-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountrySelectorComponent extends AbstractSelectorComponent {

	searchQuery = (text: string) => {
		return `fullName CONTAINS[c] "${text}" OR countryCode CONTAINS[c] "${text}"`;
	}
	itemsMatchesName = (items: any[], name: string) => {
		return items.filter(item => item === name);
	}
	isStoredFn(item) {
		return !!this.value.find(value => value === item.countryCode);
	}
	areStoredMatchesNameFn(name) {
		return !!this.value.find(val => val.toLowerCase() === name);
	}
	itemNotStoredFn(item) {
		return !((this.value || []).some(val => val === item.countryCode));
	}
	deleteStoredItemFn(item) {
		return this.value.filter(val => val !== item.countryCode);
	}
	onSelectFn(item) {
		return item.countryCode;
	}

	config: SelectorConfig;

	constructor(
		protected countrySrv: CountryService,
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef
	) { super(selectorSrv, cd); }

	setup() {
		this.config = {
			entitySrv: this.countrySrv,
			entityMetadata: ERM.COUNTRY,
			searchQuery: this.searchQuery,
			itemsMatchesName: this.itemsMatchesName,
			itemsNotStored: this.itemsNotStored,
			areStoredMatchesName: this.areStoredMatchesName,
			initialFilters: this.filterList.asFilters(),
			initialSeachTxt: this.initialSeachTxt,
			selectParams: { sortBy: 'fullName' }
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
		throw Error('country selector is not suposed to create new ones')
	}

}
