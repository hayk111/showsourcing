import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { FilterType } from '~shared/filters';


export type QuickFilter = 'archived' | 'assignee' | 'createdBy' | 'completed';

@Component({
	selector: 'controller-list-quick-filters-app',
	templateUrl: './controller-list-quick-filters.component.html',
	styleUrls: ['./controller-list-quick-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexBetween'
	}
})
export class ControllerListQuickFiltersComponent {
	@Input() quickFilters: QuickFilter[] = ['archived', 'assignee'];

	constructor(private listSrv: ListPageService<any, any>) { }

	get isAssignedToMeChecked() {
		return this.listSrv.filterList.asByType().get(FilterType.ASSIGNEE).has(UserService.userSync.id);
	}

	get isCreatedByMeChecked() {
		return this.listSrv.filterList.asByType().get(FilterType.CREATED_BY).has(UserService.userSync.id);
	}

	get isArchivedChecked() {
		return this.listSrv.filterList.asByType().get(FilterType.ARCHIVED).has(true);
	}

	get isCompletedChecked() {
		// just checking if there is a filter on due date here.
		return this.listSrv.filterList.asByType().get(FilterType.DUE_DATE);
	}

	toggleAssignedToMe() {
		const isChecked = this.isAssignedToMeChecked;
		this.listSrv.filterByAssignedToMe(!isChecked);
	}

	toggleArchived() {
		const isChecked = this.isArchivedChecked;
		this.listSrv.filterByArchived(!isChecked);
	}

	toggleCompleted() {
		const isChecked = this.isCompletedChecked;
		this.listSrv.filterByDone(!isChecked);
	}

	toggleCreatedByMe() {
		const isChecked = this.isCreatedByMeChecked;
		this.listSrv.filterByCreatedByMe(!isChecked);
	}

}
