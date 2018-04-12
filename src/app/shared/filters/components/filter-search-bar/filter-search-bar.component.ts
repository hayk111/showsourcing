import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { debounceTime, filter, mergeMap, takeUntil, tap, switchMap, map } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';
import { ERM, Entity } from '~app/entity';
import { Filter, FilterGroupName } from '~shared/filters/models';
import { searchEntity, selectFilterByType } from '~shared/filters/store/selectors';

import { FilterActions } from '../../store/actions';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { merge } from 'rxjs/observable/merge';
import { take } from 'rxjs/operators';

@Component({
	selector: 'filter-search-bar-app',
	templateUrl: './filter-search-bar.component.html',
	styleUrls: ['./filter-search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSearchBarComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	search$ = new BehaviorSubject<string>(null);
	smartSearch$: Observable<any>;

	searchControl = new FormControl('');
	// we need the filter also because we need to also display the selected chocies
	// Map<filterType, Map<filterValue, filter>>
	// this way we can easily display filters for a given type with
	// map.get(type).values();
	// or check in constant time if a value has been picked already
	// map.get(type).has(value);
	filterMap$: Observable<Map<string, Map<string, Filter>>>;
	filterMap: Map<string, Map<string, Filter>> = new Map();
	smartPanelVisible = false;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		// when the control changes, if the length is higher than 2
		this.searchControl.valueChanges.pipe(
			takeUntil(this._destroy$),
			// we remove the current search on every input
			tap(value => {
				if (this.filterMap.has('search'))
					this.removeCurrentSearch();
			}),
			// but for other actions we debounce it
			debounceTime(400),
			filter(value => value.length > 2)
		).subscribe(this.search$);
		/** When the writes in the input we do a normal search */
		this.search$.subscribe(value => this.doNormalSearch(value));
		/** When the user click on enter we will do a smart search */
		this.filterMap$ = this.store.select(selectFilterByType(this.filterGroupName));
		this.filterMap$.pipe(takeUntil(this._destroy$)).subscribe(filterMap => this.filterMap = filterMap);
	}

	/** When the user click on enter  we will do a smart search */
	onEnter() {
		this.smartPanelVisible = true;
		this.smartSearch$ = this.search$.pipe(
			// we will search the entities below
			switchMap(value => forkJoin([
				this.store.select(searchEntity(ERM.category, value)).pipe(take(1)),
				this.store.select(searchEntity(ERM.supplier, value)).pipe(take(1)),
				this.store.select(searchEntity(ERM.event, value)).pipe(take(1)),
				this.store.select(searchEntity(ERM.tag, value)).pipe(take(1)),
			])),
			// and group the result in a map for easy access
			map(searches => {
				const returnedMap = new Map<string, Array<Entity>>();
				returnedMap.set('category', searches[0]);
				returnedMap.set('supplier', searches[1]);
				returnedMap.set('event', searches[2]);
				returnedMap.set('tag', searches[3]);
				return returnedMap;
			}),
		);
	}

	/** When the writes in the input we do a normal search */
	doNormalSearch(value) {
		// we need to check if there is a value, else the user was just cleared the input
		if (value) {
			this.store.dispatch(FilterActions.addFilter({ type: 'search', value }, this.filterGroupName));
		}
	}

	removeCurrentSearch() {
		this.store.dispatch(FilterActions.removeFilterType('search', this.filterGroupName));
	}

	closeSmartSearch() {
		this.smartPanelVisible = false;
	}

	addFromSmart(filtr: Filter) {
		this.store.dispatch(FilterActions.addFilter(filtr, this.filterGroupName));
	}

	removeFromSmart(filtr: Filter) {
		this.store.dispatch(FilterActions.removeFilter(filtr, this.filterGroupName));
	}
}
