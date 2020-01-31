import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from '~core/entity-services';
import { ERM, Event } from '~core/models';
import { SelectorConfig, SelectorsService } from '~shared/selectors/services/selectors.service';

import { AbstractSelectorComponent } from '../../abstract-selector.components';

@Component({
	selector: 'event-selector-app',
	templateUrl: './event-selector.component.html',
	styleUrls: ['./event-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventSelectorComponent extends AbstractSelectorComponent {

	searchQuery = (text: string) => {
		return `name CONTAINS[c] "${text}" OR description.name CONTAINS[c] "${text}"`;
	}
	itemsMatchesName = (items: any[], name: string) => {
		return items.filter(item => (item.description.name === name || item.name === name));
	}
	isStoredFn(item) {
		return !!this.value.find(value => value.id === item.id);
	}
	areStoredMatchesNameFn(name) {
		return !!this.value.find(val => (val.description.name.toLowerCase() === name || val.name.toLowerCase() === name));
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
		protected eventSrv: EventService,
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef
	) { super(selectorSrv, cd); }

	setup() {
		this.config = {
			entitySrv: this.eventSrv,
			entityMetadata: ERM.EVENT,
			searchQuery: this.searchQuery,
			itemsMatchesName: this.itemsMatchesName,
			itemsNotStored: this.itemsNotStored,
			areStoredMatchesName: this.areStoredMatchesName,
			initialFilters: this.filterList.asFilters(),
			initialSeachTxt: this.initialSeachTxt,
			selectParams: { sortBy: 'description.name' }
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
		const trimValues = this.value.map(v => ({ id: v.id, name: v.name, __typename: v.__typename }));
		return trimValues;
	}

	createFn(): any {
		const name = this.selectorSrv.searchText;
		let item;
		let createObs$: Observable<Event>;
		if (name) {
			item = new Event({ name });
			createObs$ = this.eventSrv.create(item);
		}

		if (createObs$ === undefined)
			return;

		createObs$.subscribe();
		return item;
	}

}
