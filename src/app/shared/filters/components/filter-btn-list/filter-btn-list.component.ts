import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FilterType } from '~shared/filters/models/filter.class';
import { FilterByType } from '~shared/filters';


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
	@Input() set filterTypes(types: FilterType[]) {
		// favorite and archived aren't buttons but simple checkboxes
		this.hasFavoriteFilter = types.includes(FilterType.FAVORITE);
		this.hasArchivedFilter = types.includes(FilterType.ARCHIVED);
		// we set the buttons with the others
		this.filterBtns = types.filter(t => t !== FilterType.FAVORITE && t !== FilterType.ARCHIVED);
	}
	/** for each buttons the filters applied */
	@Input() filterMap: FilterByType;
	/** when the filter button is clicked */
	@Output() editClicked = new EventEmitter<string>();
	/** when we want to reset a certain filter type */
	@Output() resetClicked = new EventEmitter<string>();
	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();

	/** whether we display a checkbox for favorite */
	hasFavoriteFilter = true;
	/** whether we display a checkbox for archived */
	hasArchivedFilter = true;
	filterBtns: FilterType[] = [];
	archivedType = FilterType.ARCHIVED;
	favoriteType = FilterType.FAVORITE;

	addFilter(filter: Filter) {
		this.filterAdded.emit(filter);
	}

	removeFilter(filter: Filter) {
		this.filterRemoved.emit(filter);
	}

	getFiltersFor(type: FilterType) {
		return this.filterMap ? this.filterMap.get(type).values() : [];
	}

	// when a type has filter
	hasFilterFor(type: FilterType) {
		return this.filterMap.get(type).size > 0;
	}


	isArchived() {
		return this.hasFilterFor(FilterType.ARCHIVED);
	}

	isFavorite() {
		return this.hasFilterFor(FilterType.FAVORITE);
	}

	getDisplayName(filter: Filter, type: FilterType) {
		switch (type) {
			case FilterType.CREATED_BY:
				return filter.entity.firstName + ' ' + filter.entity.lastName;
			default:
				return filter.entity.name;
		}
	}
}
