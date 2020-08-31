import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { UserService } from '~core/auth';
import { authStatus } from 'lib';
import { FilterCommonService, FilterService, FilterType } from '~core/filters';
import { Typename } from 'showsourcing-api-lib';

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
	@Input() typename: Typename;
	@Input() quickFilters: QuickFilter[] = ['archived', 'assignee'];

	constructor(
		private filterSrv: FilterService,
		private userSrv: UserService,
		private cdr: ChangeDetectorRef,
		private filterCommonSrv: FilterCommonService
	) {}

	get isAssignedToMeChecked() {
		return this.filterSrv.hasFilterValue(FilterType.ASSIGNEE, this.userSrv.userId);
	}

	get isCreatedByMeChecked() {
		return this.filterSrv.hasFilterValue(FilterType.CREATED_BY, this.userSrv.userId);
	}

	get isArchivedChecked() {
		return this.filterSrv.hasFilterValue(FilterType.ARCHIVED, true);
	}

	get isCompletedChecked() {
		return this.filterSrv.hasFilterValue(FilterType.DUE_DATE, false);
	}

	toggleAssignedToMe() {
		const shouldAdd = !this.isAssignedToMeChecked;
		this.filterCommonSrv.filterByAssignedToMe(shouldAdd);
	}

	toggleArchived() {
		const isChecked = this.isArchivedChecked;
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
