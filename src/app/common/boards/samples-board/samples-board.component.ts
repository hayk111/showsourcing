import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, first, map, mergeMap, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CreationSampleDlgComponent } from '~common/dialogs/creation-dialogs';
import { SampleService, SampleStatusService, UserService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, Sample, SampleStatus } from '~core/models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { FilterList, FilterType } from '~shared/filters';
import { KanbanColumn, KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { StatusUtils, translate } from '~utils';
import { AutoUnsub } from '~utils/auto-unsub.component';


@Component({
	selector: 'samples-board-app',
	templateUrl: './samples-board.component.html',
	styleUrls: ['./samples-board.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		KanbanService,
		ListPageService
	]
})
export class SamplesBoardComponent extends AutoUnsub implements OnInit {
	columns$ = this.kanbanSrv.columns$;
	erm = ERM;
	statuses: SampleStatus[];
	amountLoaded = 15;

	constructor(
		private kanbanSrv: KanbanService,
		public listSrv: ListPageService<any, any>,
		private sampleSrv: SampleService,
		private sampleStatusSrv: SampleStatusService,
		private router: Router,
		private route: ActivatedRoute,
		private dlgSrv: DialogService,
		private userSrv: UserService
	) { super(); }

	ngOnInit() {

		this.listSrv.setup({
			entityMetadata: ERM.SAMPLE,
			entitySrv: this.sampleSrv,
			searchedFields: ['name', 'reference'],
			initialFilters: [
				{ type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id },
				{ type: FilterType.DELETED, value: false }
			],
			selectParams: { query: 'deleted == false' }
		}, false);

		const filters$ = this.listSrv.filterList.valueChanges$.pipe(
			takeUntil(this._destroy$),
			startWith(new FilterList([{ type: FilterType.DELETED, value: false }]))
		);

		const statuses$ = this.sampleStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused" AND category != "inspiration"',
				sortBy: 'step',
				descending: false
			}).pipe(
				first(),
				map(statuses => [{ id: StatusUtils.NEW_STATUS_ID, name: 'New Sample', category: StatusUtils.DEFAULT_STATUS_CATEGORY }, ...statuses]),
				tap(statuses => this.statuses = statuses),
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses)),
			);

		combineLatest(
			filters$,
			statuses$,
		).pipe(
			mergeMap(([filterList, statuses]) => combineLatest(...this.getSampleColumns(statuses, filterList))),
		).subscribe(columns => this.kanbanSrv.setData(columns));
	}

	private getSampleColumns(statuses: SampleStatus[], filterList: FilterList) {
		return statuses.map(status => {
			// for sample with null status
			const statusQuery = `status.id == "${status.id}"`;
			const predicate = filterList.asPredicate();
			const query = [
				predicate,
				statusQuery
			].join(' && ');
			const samples$ = this.sampleSrv.queryMany({ query, take: this.amountLoaded, sortBy: 'lastUpdatedDate' });
			const total$ = this.sampleSrv.queryCount(query);
			return combineLatest(samples$, total$, (samples, total) => ({ id: status.id, data: samples, total }));
		});
	}

	loadMore(col: KanbanColumn) {
		const statusQuery = `status.id == "${col.id}"`;
		const predicate = this.listSrv.filterList.asPredicate();
		const query = [
			predicate,
			statusQuery
		].filter(x => x !== '').join(' && ');

		this.sampleSrv.queryMany({
			query: query,
			take: col.data.length + this.amountLoaded,
			sortBy: 'lastUpdatedDate'
		}).pipe(
			first()
		).subscribe(samples => this.kanbanSrv.setData([{ id: col.id, data: samples }]));
	}

	onColumnSelected(samples: Sample[]) {
		samples.forEach(sample => this.listSrv.selectOne(sample));
	}

	onColumnUnselected(samples: Sample[]) {
		samples.forEach(sample => this.listSrv.unselectOne(sample));
	}

	toggleMySamples(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}

	openCreateDlg() {
		this.dlgSrv.open(CreationSampleDlgComponent).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			map((evt: CloseEvent) => evt.data)
		).subscribe(({ sample }) => {
			this.kanbanSrv.addItems([sample], StatusUtils.NEW_STATUS_ID);
		});
	}

	updateSampleStatus(event: KanbanDropEvent) {
		// if dropped in the same column do nothing
		if (event.to === event.from) {
			return;
		}
		// we update on the server
		this.sampleSrv.update(
			{
				id: event.item.id,
				status: new SampleStatus({ id: event.to.id })
			}
		).subscribe();
	}

	/** multiple */
	updateSamplesStatus(event: KanbanDropEvent) {
		const samples = event.items.map(id => ({
			id,
			status: new SampleStatus({ id: event.to.id })
		}));
		this.sampleSrv.updateMany(
			samples
		).subscribe();
	}

	onMultipleStatusUpdated(status: SampleStatus) {
		const values = this.listSrv.getSelectedIds().map(id => ({ id, status }));
		this.kanbanSrv.onExternalStatusChange(values);
		this.sampleSrv.updateMany(values).subscribe();
	}

	goToList() {
		this.router.navigate(['../list'], { relativeTo: this.route });
	}

	get selection() {
		return this.listSrv.selection;
	}

	deleteSelected() {
		const itemIds = this.listSrv.getSelectedIds();
		const del = translate('delete');
		const smpl = itemIds.length <= 1 ? translate('sample') : translate('samples');
		const text = `${del} ${itemIds.length} ${smpl}`;


		this.dlgSrv.open(ConfirmDialogComponent, { text }).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			switchMap(_ => this.listSrv.dataSrv.deleteMany(itemIds)),
		).subscribe(_ => {
			this.listSrv.selectionSrv.unselectAll();
			this.kanbanSrv.deleteItems(itemIds);
		});
	}
}
