import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../../../store/action/misc/filter.action';
import { FilterSearch, FilterGroupName, FilterSupplier, FilterCategory, FilterEvent } from '../../../../store/model/misc/filter.model';
import { Observable } from 'rxjs/Observable';
import { searchEntity, searchEntities, SmartSearch } from '../../../../store/selectors/misc/search-entities.selector';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { take, tap } from 'rxjs/operators';

@Component({
	selector: 'filter-search-bar-app',
	templateUrl: './filter-search-bar.component.html',
	styleUrls: ['./filter-search-bar.component.scss']
})
export class FilterSearchBarComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() searched = [
		FilterEvent,
		FilterSupplier,
		FilterCategory
	];
	smartSearchResult: Array<SmartSearch> = [];
	sub;

	constructor(private store: Store<any>) { }

	ngOnInit() {
	}

	search(value) {
		const filter = new FilterSearch(value);
		this.store.dispatch(FilterActions.removeFiltersForFilterClass(this.filterGroupName, FilterSearch));
		if (value)
			this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
	}


}
