import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '~core/entity-services';
import { User, ERM } from '~core/models';
import { SelectorConfig, SelectorsService } from '~shared/selectors/services/selectors.service';

import { AbstractSelectorComponent } from '../../abstract-selector.components';

@Component({
	selector: 'user-selector-app',
	templateUrl: './user-selector.component.html',
	styleUrls: ['./user-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSelectorComponent extends AbstractSelectorComponent {

	searchQuery = (text: string) => {
		return `firstName CONTAINS[c] "${text}" OR lastName CONTAINS[c] "${text}"`;
	}
	itemsMatchesName = (items: any[], name: string) => {
		return items.filter(item => (item.firstName === name || item.lastName === name));
	}
	isStoredFn(item) {
		return !!this.value.find(value => value.id === item.id);
	}
	areStoredMatchesNameFn(name) {
		return !!this.value.find(val => (val.firstName.toLowerCase() === name || val.lastName.toLowerCase() === name));
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
		protected userSrv: UserService,
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef
	) { super(selectorSrv, cd); }

	setup() {
		this.config = {
			entitySrv: this.userSrv,
			entityMetadata: ERM.USER,
			searchQuery: this.searchQuery,
			itemsMatchesName: this.itemsMatchesName,
			itemsNotStored: this.itemsNotStored,
			areStoredMatchesName: this.areStoredMatchesName,
			initialFilters: this.filterList.asFilters(),
			initialSeachTxt: this.initialSeachTxt,
			selectParams: { sortBy: 'lastName' }
		};
		this.selectorSrv.setup(this.config);
	}

	updateSingleFn() {
		const item = {
			id: this.value.id,
			firstName: this.value.firstName ? this.value.firstName : '',
			lastName: this.value.lastName ? this.value.lastName : '',
			__typename: this.value.__typename
		};
		return item;
	}

	updateMultipleFn() {
		const trimValues = this.value.map(v => ({
			id: v.id,
			firstName: v.firstName ? v.firstName : '',
			lastName: v.lastName ? v.lastName : '',
			__typename: v.__typename
		}));
		return trimValues;
	}

	createFn(): any {
		// this entity should not be able to create users
		return undefined;
	}

}
