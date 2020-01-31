import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ContactService } from '~core/entity-services';
import { ERM } from '~core/models';
import { SelectorConfig, SelectorsService } from '~shared/selectors/services/selectors.service';
import { RegexpApp } from '~utils';

import { AbstractSelectorComponent } from '../../abstract-selector.components';

@Component({
	selector: 'email-selector-app',
	templateUrl: './email-selector.component.html',
	styleUrls: ['./email-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailSelectorComponent extends AbstractSelectorComponent {

	searchQuery = (text: string) => {
		return `name CONTAINS[c] "${text}" OR email CONTAINS[c] "${text}"`;
	}
	itemsMatchesName = (items: any[], name: string) => {
		return items.filter(item => (item.name === name || item.email === name));
	}
	isStoredFn(item) {
		return !!this.value.find(value => value === item.email);
	}
	areStoredMatchesNameFn(name) {
		return !!this.value.find(val => val.toLowerCase() === name);
	}
	itemNotStoredFn(item) {
		return !((this.value || []).some(val => val === item.email));
	}
	deleteStoredItemFn(item) {
		return this.value.filter(val => val !== item);
	}
	onSelectFn(item) {
		return item.email;
	}

	config: SelectorConfig;

	constructor(
		protected contactSrv: ContactService,
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef
	) { super(selectorSrv, cd); }

	setup() {
		this.config = {
			entitySrv: this.contactSrv,
			entityMetadata: ERM.EMAIL,
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
		const item = {
			id: this.value.id,
			name: this.value.name ? this.value.name : '',
			__typename: this.value.__typename
		};
		return item;
	}

	updateMultipleFn() {
		const trimValues = this.value.map(v => v.email || v);
		return trimValues;
	}

	createFn(): any {
		const name = this.selectorSrv.searchText;
		let item;
		if (RegExp(RegexpApp.EMAIL).test(name)) {
			item = name;
		}

		return item;
	}

}
