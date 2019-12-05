import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModalService } from '~common/modals';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { SampleService, UserService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, Sample } from '~core/models';
import { FilterType } from '~shared/filters';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'my-sample-list-page-app',
	templateUrl: './my-sample-list-page.component.html',
	styleUrls: ['./my-sample-list-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService,
		KanbanService
	]
})
export class MySampleListPageComponent extends AbstractSampleCommonComponent implements OnInit {

	filterType = FilterType;
	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.PRODUCT
	];
	erm = ERM;

	constructor(
		protected router: Router,
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected sampleSrv: SampleService,
		protected dlgSrv: DialogService,
		public listSrv: ListPageService<Sample, SampleService>,
		public commonModalSrv: CommonModalService,
		public kanbanSrv: KanbanService
	) {
		super(router, route, userSrv, sampleSrv, dlgSrv, listSrv, commonModalSrv);
	}

	ngOnInit() {
		super.setup();
	}

	// can be moved to abstract
	toggleMySamples(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}

	openCreateDlg() {
		const assignee = { id: this.userSrv.userSync.id };
		this.listSrv.create(false, { assignee });
	}

	goToKanban() {
		this.router.navigate(['../board'], { relativeTo: this.route });
	}

	// this is used on sample board page too
	getFilterAmount() {
		// we filter so we don't count archieved or deleted when it's false, so the user doesn't get confused since its the default filter
		const filters = this.listSrv.filterList.asFilters()
			.filter(fil => !(fil.type === FilterType.DELETED && fil.value === false) && !(fil.type === FilterType.ASSIGNEE));
		return filters.length;
	}
}
