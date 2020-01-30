import { Component, Input } from '@angular/core';
import { UserService } from '~core/erm/services';
import { ListPageService } from '~core/list-page';
import { FilterType } from '~shared/filters';


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

	constructor(private listSrv: ListPageService<any, any>) { }

	get isAssignedToMeChecked() {
		return this.listSrv.filterList.asByType().get(FilterType.ASSIGNEE).has(UserService.userSync.id);
	}

	get isCreatedByMeChecked() {
		return this.listSrv.filterList.asByType().get(FilterType.CREATED_BY).has(UserService.userSync.id);
	}

	get isArchivedChecked() {
		// if there is an archive filter it's not checked (yeah I know what you are thinking)
		// If you read this you should buy a boat and leave. And if you don't have the money
		// leave without a boat
		return !this.listSrv.filterList.asByType().get(FilterType.ARCHIVED).has(false);
	}

	get isCompletedChecked() {
		return !this.listSrv.filterList.asByType().get(FilterType.DUE_DATE).has(false);
	}

	toggleAssignedToMe() {
		const isChecked = this.isAssignedToMeChecked;
		this.listSrv.filterByAssignedToMe(!isChecked);
	}

	toggleArchived() {
		const isChecked = this.isArchivedChecked;
		// it's the opposite here we want to remove the filter when it's checked, just buy that boat dude
		this.listSrv.filterByArchived(isChecked);
	}

	toggleCompleted() {
		const isChecked = this.isCompletedChecked;
		// it's the opposite here we want to remove the filter when it's checked
		this.listSrv.filterByDone(isChecked);
	}

	toggleCreatedByMe() {
		const isChecked = this.isCreatedByMeChecked;
		this.listSrv.filterByCreatedByMe(!isChecked);
	}

}
