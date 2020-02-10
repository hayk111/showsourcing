import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Currency, EntityMetadata, EntityName, ERM, ListQuery, SelectParams, SelectParamsConfig } from '~core/erm';
import { Filter } from '~shared/filters';
import { FilterList } from '~shared/filters/models/filter-list.class';

import { AbstractSelectorHighlightableComponent } from '../utils/abstract-selector-highlightable.component';

export interface SelectorConfig {
	entitySrv: any;
	entityMetadata: EntityMetadata;
	searchQuery: (text: string) => string;
	itemsNotStored: (items: any[]) => any[];
	areStoredMatchesName: (name: string) => boolean;
	itemsMatchesName: (items: any[], name: string) => any[];
	selectParams?: SelectParamsConfig;
	initialFilters?: Filter[];
	initialSeachTxt?: string;
}

export interface SelectorCustomConfig {
	items: any[];
	searchFunc: void;
}

@Injectable({
	providedIn: 'root',
})
export class SelectorsService {

	listResult: ListQuery<any>;
	items$: Observable<any[]>;


	searched$: BehaviorSubject<string> = new BehaviorSubject('');
	/** whether the search has a exact match or not to display the create button */
	nameExists$: Observable<boolean>;

	selectParams: SelectParamsConfig = new SelectParams({ descending: false, sortBy: 'name' });
	entitySrv: any;
	entityName: EntityName;
	entityMetadata: EntityMetadata;

	// we use this to trigger the search when we use a map instead of the global data
	search$: BehaviorSubject<string> = new BehaviorSubject('');
	searchText: string;
	filterList = new FilterList([]);

	value: any[];

	searchQuery: (text: string) => string;
	itemsNotStored: (items: any[]) => any[];
	areStoredMatchesName: (name: string) => boolean;
	itemsMatchesName: (items: any[], name: string) => any[];

	currentSearchQuery = '';

	/** key manager that controlls the selection with arrowkeys  */
	keyManager: ActiveDescendantKeyManager<AbstractSelectorHighlightableComponent>;
	/** index when using manager keys and virtual scrolling */
	count = 0;
	// this helps the condition of fast typing only apply when typing and pressing Enter (OnKeyDown function)
	movedArrow = false;


	// SPECIAL VARIABLES FOR CURRENCY
	topCurrencies$: Observable<Currency[]>;

	constructor() { }

	setup(config: SelectorConfig) {
		const mergedParams = { ...this.selectParams, ...config.selectParams };
		Object.assign(this, config);
		this.selectParams = { ...mergedParams };

		this.filterList = new FilterList(
			config.initialFilters
		);
		if (this.filterList)
			this.selectParams = { ...this.selectParams, query: this.filterList.asPredicate() };

		this.listResult = this.entitySrv.getListQuery(this.selectParams);
		this.items$ = this.listResult.items$.pipe(
			// remove deleted items from the list cuz they stay if they
			// start at deleted false then are updated as deleted true
			// and we can't use refetch or we lose the pagination
			map(items => (items || []).filter(itm => !itm.deleted)),
			map(items => config.itemsNotStored(items))
		);
		this.listResult.items$.connect();

		this.nameExists$ = this.searched$.pipe(
			switchMap(_ => this.items$.pipe(
				map(items => config.itemsMatchesName(items, this.searchText)),
				map(items => (!!items.length || !this.searchText || config.areStoredMatchesName(this.searchText)))
			))
		);

		if (this.entityMetadata === ERM.CURRENCY) {
			this.topCurrencies$ = this.entitySrv.queryMany(
				{ ...this.selectParams, query: 'symbol == "EUR" OR symbol == "USD" OR symbol == "CNY"' }
			);
		}
	}

	search(text: string) {
		this.searchText = text.trim();
		this.movedArrow = false;
		this.querySearch(this.searchText).subscribe(_ => {
			this.searchText ? this.keyManager.setFirstItemActive() : this.keyManager.updateActiveItem(-1);
			this.searched$.next(this.searchText);
		});
	}

	querySearch(text: string) {
		if (text) {
			this.currentSearchQuery = this.searchQuery(text);
			if (this.entityMetadata === ERM.CURRENCY) {
				this.topCurrencies$ = this.entitySrv.queryMany({
					query: `((symbol == "EUR" OR symbol == "USD" OR symbol == "CNY") AND symbol CONTAINS[c] "${text}")` +
						` OR ((symbol == "EUR" OR symbol == "USD" OR symbol == "CNY") AND name CONTAINS[c] "${text}")`
				});
			}
		} else {
			this.currentSearchQuery = '';
		}

		if (this.currentSearchQuery && this.selectParams.query)
			this.currentSearchQuery = '(' + this.currentSearchQuery + ') AND ' + this.selectParams.query;
		else if (this.selectParams.query)
			this.currentSearchQuery = this.selectParams.query;

		return this.listResult.refetch({ ...this.selectParams, query: this.currentSearchQuery });
	}

	setupCustom(config: SelectorCustomConfig) {

	}

	refetch() {
		if (this.listResult) {
			return this.listResult.refetch(this.selectParams).pipe(take(1));
		}
	}

	loadMore() {
		return this.listResult.fetchMore().subscribe();
	}

}


