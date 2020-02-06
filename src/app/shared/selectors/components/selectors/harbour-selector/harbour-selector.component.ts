import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { HarbourService } from '~core/entity-services/harbour/harbour.service';
import { ERM } from '~core/models';
import { SelectorConfig, SelectorsService } from '~shared/selectors/services/selectors.service';

import { AbstractSelectorComponent } from '../../abstract-selector.components';


@Component({
	selector: 'harbour-selector-app',
	templateUrl: './harbour-selector.component.html',
	styleUrls: ['./harbour-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HarbourSelectorComponent extends AbstractSelectorComponent {

	searchQuery = (text: string) => {
		return `name CONTAINS[c] "${text}"`;
	}
	itemsMatchesName = (items: any[], name: string) => {
		return items.filter(item => item === name);
	}
	isStoredFn(item) {
		return !!this.value.find(value => value === item.name);
	}
	areStoredMatchesNameFn(name) {
		return !!this.value.find(val => val.toLowerCase() === name);
	}
	itemNotStoredFn(item) {
		return !((this.value || []).some(val => val === item.name));
	}
	deleteStoredItemFn(item) {
		return this.value.filter(val => val !== item.name);
	}
	onSelectFn(item) {
		return item.name;
	}

	config: SelectorConfig;

	constructor(
		protected harbourSrv: HarbourService,
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef
	) { super(selectorSrv, cd); }

	setup() {
		this.config = {
			entitySrv: this.harbourSrv,
			entityMetadata: ERM.HARBOUR,
			searchQuery: this.searchQuery,
			itemsMatchesName: this.itemsMatchesName,
			itemsNotStored: this.itemsNotStored,
			areStoredMatchesName: this.areStoredMatchesName,
			initialFilters: this.filterList.asFilters(),
			initialSeachTxt: this.initialSeachTxt
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
		throw Error('harbour selector is not suposed to create new ones');
	}

}
