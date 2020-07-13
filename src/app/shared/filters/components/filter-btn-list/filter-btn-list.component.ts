import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FilterType, FilterService } from '~core/filters';
import { TrackingComponent } from '~utils/tracking-component';

/**
 * displays a label with its active filters under it. If no active filters it displays a btn, ence the name
 */
@Component({
	selector: 'filter-btn-list-app',
	templateUrl: './filter-btn-list.component.html',
	styleUrls: ['./filter-btn-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBtnListComponent extends TrackingComponent {
	/** btns displayed */
	@Input() filterTypes: FilterType[];
	/** when the filter button is clicked */
	@Output() editClicked = new EventEmitter<string>();

	allFilterTypes = FilterType;
	otherFiltersLabelShown = false;

	constructor(
		public filterSrv: FilterService
	) {
		super();
	}

	isArchived() {
		return this.filterSrv.hasFilterValue(FilterType.ARCHIVED, true);
	}

	isFavorite() {
		return this.filterSrv.hasFilterValue(FilterType.FAVORITE, true);
	}

	isDone() {
		return this.filterSrv.hasFilterValue(FilterType.DONE, true);
	}

	updateFilter(type, value) {
		this.filterSrv.filterByProp(type, value);
		this.otherFiltersLabelShown = false; // reinitializing otherFiltersLabelShown value
	}

	/**
	 * Whether to show or not "Others" label
	 * @param  {FilterType} type
	 * @returns boolean
	 */
	otherFiltersLabel(type: FilterType): boolean {
		if ((type === FilterType.ARCHIVED ||
				 type === FilterType.FAVORITE ||
				 type === FilterType.DONE)    &&
				 !this.otherFiltersLabelShown) {
			this.otherFiltersLabelShown = true;
			return true;
		}

		return false;
	}

}
