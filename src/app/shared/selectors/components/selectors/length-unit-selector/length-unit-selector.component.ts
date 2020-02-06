import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { LengthUnitService } from '~core/entity-services/length-unit/length-unit.service';
import { ERM } from '~core/models';
import { SelectorConfig, SelectorsService } from '~shared/selectors/services/selectors.service';

import { AbstractSelectorComponent } from '../../abstract-selector.components';


@Component({
	selector: 'length-unit-selector-app',
	templateUrl: './length-unit-selector.component.html',
	styleUrls: ['./length-unit-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LengthUnitSelectorComponent extends AbstractSelectorComponent {

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
		protected lengthUnitSrv: LengthUnitService,
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef
	) { super(selectorSrv, cd); }

	setup() {
		this.config = {
			entitySrv: this.lengthUnitSrv,
			entityMetadata: ERM.WEIGHT_UNIT,
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
		throw Error('length unit selector is not suposed to create new ones')
	}

}
