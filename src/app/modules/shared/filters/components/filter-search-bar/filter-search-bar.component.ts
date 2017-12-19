import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterGroupName } from '../../../../store/model/filter.model';
import { searchEntityWithFilters, searchEntitiesWithFilters } from '../../../../store/selectors/search-entities.selector';
import { take } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { zip } from 'rxjs/observable/zip';
import { distinctUntilChanged } from 'rxjs/operators';

import { Entity, EntityRepresentation, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { FilterActions } from '../../../../store/action/filter.action';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'filter-search-bar-app',
	templateUrl: './filter-search-bar.component.html',
	styleUrls: ['./filter-search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSearchBarComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() searchableEntitiesRepr: Array<EntityRepresentation>;
	search = '';
	searchTerms$: Observable<any>;
	private searchEntRep = entityRepresentationMap.search;
	private keyDown = new Subject<string>();

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.keyDown
		.pipe(
			debounceTime(400),
			distinctUntilChanged()
		).subscribe(x => this.doSearch());
	}

	onChange() {
		this.store.dispatch(FilterActions.removeFiltersForEntityReprs(this.filterGroupName, [this.searchEntRep]));
		this.keyDown.next(this.search);
		if (this.search.length > 2) {
			this.searchViaPanel();
		}
	}

	searchViaPanel() {
		this.searchTerms$ = this.store.select(searchEntitiesWithFilters(this.filterGroupName, this.searchableEntitiesRepr, this.search));
	}

	doSearch() {
		const name = `search: ${this.search}`;
		const ac = FilterActions.addFilter(this.filterGroupName, this.searchEntRep, name, this.search);
		this.store.dispatch(ac);
	}

	closeSmartSearch() {
		this.searchTerms$ = undefined;
	}

	onFilterChange(event, target: EntityRepresentation, itemName: string, itemId: string) {
		if (event.checked)
			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, target, itemName, itemId));
		else
			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, target, itemId));
	}

}
