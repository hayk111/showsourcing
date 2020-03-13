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
	allFilterTypes = FilterType;
	/** btns displayed */
	@Input() filterTypes: FilterType[];
	/** when the filter button is clicked */
	@Output() editClicked = new EventEmitter<string>();

	constructor(public filterSrv: FilterService) {
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

	onArchivedChange() {
		const current = this.filterMap.get(FilterType.ARCHIVED).get(this.isArchived());
		const next = { type: FilterType.ARCHIVED, value: !this.isArchived() };
		this.removeFilter(current);
		this.addFilter(next);
	}

	onDoneChange() {
		// simple copy of what's for ARCHIVED. The whole filter thing needs to be
		// refactored because it's hard to get into.
		const current = this.filterMap.get(FilterType.DONE).get(this.isDone());
		const next = { type: FilterType.DONE, value: !this.isArchived() };
		this.removeFilter(current);
		this.addFilter(next);
	}



	getDisplayName(filter: Filter, type: FilterType) {
		// switch (type) {
		// 	case FilterType.ASSIGNEE:
		// 	case FilterType.CREATED_BY:
		// 		return filter.entity.firstName + ' ' + filter.entity.lastName;
		// 	case FilterType.EVENT:
		// 		return filter.entity.description.name;
		// 	default:
		// 		return filter.entity.name;
		// }
	}

}
