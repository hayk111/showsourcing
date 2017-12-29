import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterGroupName, filterRepresentationMap, FilterRepresentation } from '../../../../store/model/filter.model';
import { searchEntityWithFilters, searchEntitiesWithFilters } from '../../../../store/selectors/search-entities.selector';
import { take, map, switchMap, concatAll } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { zip } from 'rxjs/observable/zip';
import { distinctUntilChanged } from 'rxjs/operators';

import { Entity, EntityRepresentation, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { FilterActions } from '../../../../store/action/filter.action';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

@Component({
	selector: 'filter-search-bar-app',
	templateUrl: './filter-search-bar.component.html',
	styleUrls: ['./filter-search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSearchBarComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	searchTerms: any;
	private searchRep = filterRepresentationMap.search;
	private keyDown = new Subject<string>();

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.keyDown
		.pipe(
			debounceTime(400),
			distinctUntilChanged()
		).subscribe(val => this.doSearch(val));
	}

	search(value) {
		this.store.dispatch(FilterActions.removeFiltersForFilterReprs(this.filterGroupName, [this.searchRep]));
		if (value > 2) {
			this.keyDown.next(value);
		}
	}

	doSearch(val) {
		const name = `search: ${val}`;
		const ac = FilterActions.addFilter(this.filterGroupName, this.searchRep, name, val);
		this.store.dispatch(ac);
		// this.searchTerms = ENTITY_SEARCHED
		// 	.map(
		// 		(ent: EntityRepresentation) => ({ entityRepr: ent, values: this.selectSearch(val, ent) })
		// 	);
	}

	selectSearch(val: any, ent: EntityRepresentation) {
		return this.store.select<any>(searchEntityWithFilters(this.filterGroupName, ent, val));
	}

	closeSmartSearch() {
		this.searchTerms = undefined;
	}

	onFilterChange(event, repr: FilterRepresentation, itemName: string, itemId: string) {
		if (event.checked)
			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, repr, itemName, itemId));
		else
			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, repr, itemId));
	}

}

const ENTITY_SEARCHED = [
	entityRepresentationMap.categories,
	entityRepresentationMap.events,
	entityRepresentationMap.suppliers,
	entityRepresentationMap.tags,
	entityRepresentationMap.tasks,
	entityRepresentationMap.projects
];
