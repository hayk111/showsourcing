import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, FilterType, FilterService, FilterCommonService } from '~core/filters';
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

	constructor(
		public filterSrv: FilterService,
		public filterCommonSrv: FilterCommonService
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

}
