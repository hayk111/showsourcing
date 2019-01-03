import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModalService } from '~common/modals';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { SampleService, UserService, SampleStatusService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { Sample, ERM, Product, SampleStatus } from '~core/models';
import { FilterType } from '~shared/filters';
import { KanbanDropEvent, KanbanColumn } from '~shared/kanban/interfaces';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { first, map, switchMap, filter, tap } from 'rxjs/operators';
import { CloseEventType } from '~shared/dialog';
import { ListQuery } from '~core/entity-services/_global/list-query.interface';
import { makeColumns } from '~utils/kanban.utils';

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
	filterType = FilterType;
	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.PRODUCT
	];
	private samplesMap = new Map<string, ListQuery<Sample>>();
	private totalMap = new Map<string, ListQuery<number>>();

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

		const sampleStatus$ = this.sampleStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused" AND category != "inspiration"',
				descending: false
			}).pipe();

		this.columns$ = sampleStatus$.pipe(
			tap(statuses => this.getSamples(statuses)),
			switchMap(statuses => makeColumns(statuses, this.samplesMap, this.totalMap)),
		);
	}

	loadMore(col: KanbanColumn) {
		this.samplesMap.get(col.id).fetchMore().subscribe();
	}

	private getSamples(statuses: SampleStatus[]) {
		statuses.forEach(status => {
			const query = `status.id == "${status.id}"`;
			const samples$ = this.sampleSrv.getListQuery({ query, take: 8, sortBy: 'lastUpdatedDate' });
			const total$ = this.sampleSrv.customQuery({
				query, take: 8, sortBy: 'lastUpdatedDate'
			}, `query samplesCount($query: String) {
				samplesCount(query: $query)
			}`);
			// unfortunately we have to filter a second time on the front end
			// because optimistic UI doesn't take the query into account
			samples$.items$ = samples$.items$.pipe(
				// map(samples => samples
				// 	.filter(s => s.status.id === status.id)
				// )
			);
			this.samplesMap.set(status.id, samples$);
			this.totalMap.set(status.id, total$);
		});
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
		}).pipe(
			// refetch so we get the info..
			switchMap(_ => forkJoin(
				this.totalMap.get(event.to.id).refetch({}),
				this.totalMap.get(event.from.id).refetch({}),
				this.samplesMap.get(event.to.id).refetch({ take: event.to.data.length }),
				this.samplesMap.get(event.from.id).refetch({ take: event.from.data.length }),
			))
		).subscribe();
	}

	/** multiple */
	updateStatusSamples(event: KanbanDropEvent) {
		const products = event.items.map(id => ({
			id,
			status: new SampleStatus({ id: event.to.id })
		}));
		this.sampleSrv.updateMany(products).pipe(
			// refetch so we get the info..
			switchMap(_ => forkJoin(
				this.totalMap.get(event.to.id).refetch({}),
				this.totalMap.get(event.from.id).refetch({}),
				this.samplesMap.get(event.to.id).refetch({ take: event.to.data.length }),
				this.samplesMap.get(event.from.id).refetch({ take: event.from.data.length }),
			))
		).subscribe();
	}

	onMultipleStatusUpdated(selection, status) {

	}

	openCreateDlg() {
		const assignee = this.userSrv.userSync;
		this.commonModalSrv.openCreateDlg(ERM.SAMPLE, false).pipe(
			map(name => new Sample({ name, assignee })),
			switchMap(sample => this.sampleSrv.create(sample)),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}
}
