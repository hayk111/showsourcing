import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { SampleService, UserService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, Sample } from '~core/models';
import { FilterType } from '~shared/filters';
import { KanbanService } from '~shared/kanban/services/kanban.service';

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
		public listSrv: ListPageService<Sample, SampleService>,
		public commonModalSrv: CommonModalService,
		public kanbanSrv: KanbanService
	) {
		super(router, route, userSrv, sampleSrv, listSrv, commonModalSrv);
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
}
