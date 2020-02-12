import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { SelectorElementService } from '~core/erm';
import { ERM } from '~core/erm';
import { SelectorConfig, SelectorsService } from '~shared/selectors/services/selectors.service';
import { ID } from '~utils';

import { AbstractSelectorComponent } from '../../abstract-selector.components';

@Component({
	selector: 'selector-element-selector-app',
	templateUrl: './selector-element-selector.component.html',
	styleUrls: ['./selector-element-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorElementSelectorComponent extends AbstractSelectorComponent {

  @Input() definitionReference: ID;
  
	searchQuery = (text: string) => {
		return `value CONTAINS[c] "${text}"`;
	}
	itemsMatchesName = (items: any[], name: string) => {
		return items.filter(item => item.value === name);
	}
	isStoredFn(item) {
		return !!this.value.find(value => value.id === item.id);
	}
	areStoredMatchesNameFn(name) {
		return !!this.value.find(val => val.value.toLowerCase() === name);
	}
	itemNotStoredFn(item) {
		return !((this.value || []).some(val => val.id === item.id));
	}
	deleteStoredItemFn(item) {
		return this.value.filter(val => val.id !== item.id);
	}
	onSelectFn(item) {
		return item;
	}

	config: SelectorConfig;

	constructor(
		protected selectorElementSrv: SelectorElementService,
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef
	) { super(selectorSrv, cd); }

	setup() {
    if (!this.definitionReference)
      throw Error('The selector `SelectorElement` needs a definitionReference to target');

		this.config = {
			entitySrv: this.selectorElementSrv,
			entityMetadata: ERM.SELECTOR_ELEMENT,
			searchQuery: this.searchQuery,
			itemsMatchesName: this.itemsMatchesName,
			itemsNotStored: this.itemsNotStored,
			areStoredMatchesName: this.areStoredMatchesName,
			initialFilters: this.filterList.asFilters(),
      initialSeachTxt: this.initialSeachTxt,
      selectParams: { sortBy: 'value', query: `fieldDefinition.id == "${this.definitionReference}"` }
		};
		this.selectorSrv.setup(this.config);
	}

	updateSingleFn() {
		const item = {
      id: this.value.id,
      value: this.value.value,
      __typename: this.value.__typename
    };
		return item;
	}

	updateMultipleFn() {
		const trimValues = this.value.map(v => (
      {
        id: v.id,
        value: v.value,
        __typename: v.__typename
      }
    ));
		return trimValues;
	}

	createFn(): any {
		// this entity should not be able to create
		throw Error('selector element selector is not suposed to create new ones');
	}

}
