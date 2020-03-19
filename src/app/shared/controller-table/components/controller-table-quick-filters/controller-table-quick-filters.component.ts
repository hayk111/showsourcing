import { Component, Input } from '@angular/core';
import { UserService } from '~core/auth';
import { FilterCommonService, FilterService, FilterType } from '~core/filters';

export type QuickFilter = 'archived' | 'assignee' | 'createdBy' | 'completed';

@Component({
	selector: 'controller-table-quick-filters-app',
	templateUrl: './controller-table-quick-filters.component.html',
	styleUrls: ['./controller-table-quick-filters.component.scss'],
	host: {
		class: 'flexBetween'
	}
})
export class ControllerTableQuickFiltersComponent {
	@Input() quickFilters: QuickFilter[] = ['archived', 'assignee'];

	constructor(
		private filterSrv: FilterService,
		private filterCommonSrv: FilterCommonService
	) {}

	get isAssignedToMeChecked() {
		return this.filterSrv.hasFilterValue(FilterType.ASSIGNEE, UserService.userSync.id);
	}

	get isCreatedByMeChecked() {
		return this.filterSrv.hasFilterValue(FilterType.CREATED_BY, UserService.userSync.id);
	}

	get isArchivedChecked() {
		return this.filterSrv.hasFilterValue(FilterType.ARCHIVED, true);
	}

	get isCompletedChecked() {
		return this.filterSrv.hasFilterValue(FilterType.DUE_DATE, false);
	}

	toggleAssignedToMe() {
		const isChecked = this.isAssignedToMeChecked;
		this.filterCommonSrv.filterByAssignedToMe(!isChecked);
	}

	toggleArchived() {
		const isChecked = this.isArchivedChecked;
		// it's the opposite here we want to remove the filter when it's checked, just buy that boat dude
		this.filterCommonSrv.filterByArchived(isChecked);
	}

	toggleCompleted() {
		const isChecked = this.isCompletedChecked;
		// it's the opposite here we want to remove the filter when it's checked
		this.filterCommonSrv.filterByDone(isChecked);
	}

	toggleCreatedByMe() {
		const isChecked = this.isCreatedByMeChecked;
		this.filterCommonSrv.filterByCreatedByMe(!isChecked);
	}
}
