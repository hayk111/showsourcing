import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterGroupName } from '../../../../store/model/filter.model';
import { searchEntities, SearchedEntity } from '../../../../store/selectors/search-entities.selector';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Entity } from '../../../../store/utils/entities.utils';
import { FilterActions } from '../../../../store/action/filter.action';
@Component({
	selector: 'filter-search-bar-app',
	templateUrl: './filter-search-bar.component.html',
	styleUrls: ['./filter-search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSearchBarComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	search = '';
	searchTerms$: Observable<Array<SearchedEntity>>;
	constructor(private store: Store<any>) { }

	ngOnInit() {
	}

	onChange() {
		if (this.search.length > 2) {
			this.searchTerms$ = this.store.select(searchEntities(this.filterGroupName, this.search))
			.pipe(
				take(1)
			);
		}
	}

	closeSmartSearch() {
		this.searchTerms$ = undefined;
	}

	onFilterChange(event, target, itemName, itemId) {
		if (event.checked)
			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, target, itemName, itemId));
		else
			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, target, itemId));
	}

}
