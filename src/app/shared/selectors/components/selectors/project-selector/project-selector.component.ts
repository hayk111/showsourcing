import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '~core/erm';
import { Project, ERM } from '~core/erm';
import { SelectorConfig, SelectorsService } from '~shared/selectors/services/selectors.service';

import { AbstractSelectorComponent } from '../../abstract-selector.components';

@Component({
	selector: 'project-selector-app',
	templateUrl: './project-selector.component.html',
	styleUrls: ['./project-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectorComponent extends AbstractSelectorComponent {

	searchQuery = (text: string) => {
		return `name CONTAINS[c] "${text}"`;
	}
	itemsMatchesName = (items: any[], name: string) => {
		return items.filter(item => item.name === name);
	}
	isStoredFn(item) {
		return !!this.value.find(value => value.id === item.id);
	}
	areStoredMatchesNameFn(name) {
		return !!this.value.find(val => val.name.toLowerCase() === name);
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
		protected projectSrv: ProjectService,
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef
	) { super(selectorSrv, cd); }

	setup() {
		this.config = {
			entitySrv: this.projectSrv,
			entityMetadata: ERM.PROJECT,
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
		const trimValues = this.value.map(v => ({ id: v.id, name: v.name, __typename: v.__typename }));
		return trimValues;
	}

	createFn(): any {
		const name = this.selectorSrv.searchText;
		let item;
		let createObs$: Observable<Project>;
		if (name) {
			item = new Project({ name });
			createObs$ = this.projectSrv.create(item);
		}

		if (createObs$ === undefined)
			return;

		createObs$.subscribe();
		return item;
	}

}
