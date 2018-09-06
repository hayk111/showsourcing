import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Filter, FilterType } from '~shared/filters/models';


/**
 * displays a label with its active filters under it. If no active filters it displays a btn, ence the name
 */
@Component({
	selector: 'filter-btn-list-app',
	templateUrl: './filter-btn-list.component.html',
	styleUrls: ['./filter-btn-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBtnListComponent {
	/** btns displayed */
	@Input() filterBtns: FilterType[] = [];
	/** for each buttons the filters applied */
	@Input() filterMap: Map<FilterType, Filter[]>;
	/** whether we display a checkbox for favorite */
	@Input() hasFavoriteFilter = true;
	/** whether we display a checkbox for archived */
	@Input() hasArchivedFilter = true;
	/** when the filter button is clicked */
	@Output() editClicked = new EventEmitter<string>();
	/** when we want to reset a certain filter type */
	@Output() resetClicked = new EventEmitter<string>();

	archivedType = FilterType.ARCHIVED;
	favoriteType = FilterType.FAVORITE;

	getFiltersFor(type: FilterType) {
		return this.filterMap ? this.filterMap.get(type) : [];
	}

	addFilter(filter: Filter) { }

	removeFilter(filter: Filter) { }
}
