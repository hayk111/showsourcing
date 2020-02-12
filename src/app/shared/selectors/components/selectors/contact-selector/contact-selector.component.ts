import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService } from '~core/erm';
import { Contact, ERM } from '~core/erm';
import { SelectorConfig, SelectorsService } from '~shared/selectors/services/selectors.service';

import { AbstractSelectorComponent } from '../../abstract-selector.components';
import { RegexpApp } from '~utils';

@Component({
	selector: 'contact-selector-app',
	templateUrl: './contact-selector.component.html',
	styleUrls: ['./contact-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSelectorComponent extends AbstractSelectorComponent {

	searchQuery = (text: string) => {
		return `name CONTAINS[c] "${text}" OR email CONTAINS[c] "${text}"`;
	}
	itemsMatchesName = (items: any[], name: string) => {
		return items.filter(item => (item.name === name || item.email == name));
	}
	isStoredFn(item) {
		return !!this.value.find(value => value.id === item.id);
	}
	areStoredMatchesNameFn(name) {
		return !!this.value.find(val => (val.name.toLowerCase() === name || val.email.toLowerCase() === name));
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
		protected contactSrv: ContactService,
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef
	) { super(selectorSrv, cd); }

	setup() {
		this.config = {
			entitySrv: this.contactSrv,
			entityMetadata: ERM.CONTACT,
			searchQuery: this.searchQuery,
			itemsMatchesName: this.itemsMatchesName,
			itemsNotStored: this.itemsNotStored,
			areStoredMatchesName: this.areStoredMatchesName,
			initialFilters: this.filterList.asFilters(),
			initialSeachTxt: this.initialSeachTxt,
			selectParams: { query: 'email contains "@"' }
		};
		this.selectorSrv.setup(this.config);
	}

	updateSingleFn() {
		const item = {
			id: this.value.id,
			email: this.value.email,
			supplier: this.value.supplier ? this.value.supplier : null,
			__typename: this.value.__typename
		};
		return item;
	}

	updateMultipleFn() {
		const trimValues = this.value.map(v => ({ id: v.id, name: v.name, __typename: v.__typename }));
		return trimValues;
	}

	createFn(): any {
		const name = this.selectorSrv.searchText;
		let item;
		let createObs$: Observable<Contact>;
		if (RegExp(RegexpApp.EMAIL).test(name)) {
			item = new Contact({ email: name });
			createObs$ = this.contactSrv.create(item);
		}

		if (createObs$ === undefined)
			return;

		createObs$.subscribe();
		return item;
	}

}
