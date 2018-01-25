import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { take, tap } from 'rxjs/operators';
import { FilterGroupName, FilterEvent, FilterSupplier, FilterCategory, FilterSearch } from '../../../../store/model/misc/filter.model';
import { SmartSearch, searchEntities } from '../../../../store/selectors/entities/search-entities.selector';
import { FilterActions } from '../../../../store/action/misc/filter.action';

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
		if (value) {
			this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
			this.smartSearch(value);
		} else {
			this.closeSmartPanel();
		}
	}

	smartSearch(value) {
		this.sub = this.store.select(searchEntities(this.filterGroupName, this.searched, value)).pipe(
		).subscribe(result => this.smartSearchResult = result);
	}

	// we need to unsubscribe from the smartSearch when the panel is not visible
	closeSmartPanel() {
		this.sub.unsubscribe();
		this.smartSearchResult = [];
	}

	onSmartResult(r: Array<any>) {}

}
