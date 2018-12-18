import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModalService } from '~common/modals';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { SampleService, UserService, SampleStatusService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { Sample, ERM } from '~core/models';
import { FilterType } from '~shared/filters';
import { KanbanDropEvent, KanbanColumn } from '~shared/kanban/interfaces';
import { statusSampleToKanbanCol } from '~utils/kanban.utils';
import { Observable, combineLatest } from 'rxjs';
import { first, map, switchMap, filter } from 'rxjs/operators';
import { CloseEventType } from '~shared/dialog';

@Component({
	selector: 'my-sample-page-app',
	templateUrl: './my-sample-page.component.html',
	styleUrls: ['./my-sample-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class MySamplePageComponent extends AbstractSampleCommonComponent implements OnInit {

	columns$: Observable<KanbanColumn[]>;

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
		private sampleStatusSrv: SampleStatusService,
		public listSrv: ListPageService<Sample, SampleService>,
		public commonModalSrv: CommonModalService,
	) {
		super(router, route, userSrv, sampleSrv, listSrv, commonModalSrv);
	}

	ngOnInit() {
		super.setup();

		// we just take the first 15 since this is a test and we just want to display the behaviour
		const samples$ = this.sampleSrv.queryMany({ take: 100 }).pipe(
			first(),
			// we lose the order when the product is updated
			// because apollo has no idea of how to reorder items unless we do
			// a refetch, but we re gonna do it on the front end
			map(sample => sample.sort(
				(a, b) => +(new Date(b.lastUpdatedDate)) - (+new Date(a.lastUpdatedDate)))
			)
		);

		const sampleStatus$ = this.sampleStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused" AND category != "inspiration"',
				descending: false
			}).pipe();

		this.columns$ = combineLatest(
			sampleStatus$,
			samples$,
			statusSampleToKanbanCol
		);
	}

	// can be moved to abstract
	toggleMySamples(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}

	updateStatusSample(event: KanbanDropEvent) {
		if (event.to === event.from) {
			return;
		}
		this.sampleSrv.update({
			id: event.item.id,
			status: {
				id: event.to,
				__typename: 'SampleStatus'
			}
		}).subscribe();
	}

	updateStatusSamples(event: { to: any, items: any[] }) {
		const samples = event.items.map(id => ({
			id,
			status: { id: event.to, __typename: 'SampleStatus' }
		}));
		this.sampleSrv.updateMany(samples).subscribe();
	}

	onMultipleStatusUpdated(selection, status) {

	}

	openCreateDlg() {
		this.commonModalSrv.openCreateDlg(ERM.SAMPLE, false).pipe(
			filter(evt => evt.type === CloseEventType.OK),
			map(evt => evt.data),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}
}
