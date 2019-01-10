import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { first, tap, switchMap, takeUntil, startWith } from 'rxjs/operators';
import { SampleService, SampleStatusService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { Sample, SampleStatus, ERM } from '~core/models';
import { KanbanColumn, KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterType, FilterList } from '~shared/filters';
import { Observable, combineLatest } from 'rxjs';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils/auto-unsub.component';


@Component({
	selector: 'my-sample-board-page-app',
	templateUrl: './my-sample-board-page.component.html',
	styleUrls: ['./my-sample-board-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		KanbanService,
		ListPageService
	]
})
export class MySampleBoardPageComponent extends AutoUnsub implements OnInit {
	columns$ = this.kanbanSrv.columns$;
	filterType = FilterType;
	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.PRODUCT
	];
	erm = ERM;
	statuses: SampleStatus[];

	constructor(
		private kanbanSrv: KanbanService,
		public listSrv: ListPageService<any, any>,
		private sampleSrv: SampleService,
		private sampleStatusSrv: SampleStatusService,
		private router: Router,
		private route: ActivatedRoute,
		private dlgSrv: DialogService
	) { super(); }

	ngOnInit() {

		this.listSrv.setup({
			key: `sample-kanban`,
			entityMetadata: ERM.SAMPLE,
			entitySrv: this.sampleSrv,
			initialFilters: [{ type: FilterType.DELETED, value: false }]
		}, false);

		const filters$ = this.listSrv.filterList.valueChanges$.pipe(
			takeUntil(this._destroy$),
			startWith(new FilterList([{ type: FilterType.DELETED, value: false }]))
		);

		const statuses$ = this.sampleStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused" AND category != "inspiration"',
				descending: false
			}).pipe(
				first(),
				tap(statuses => this.statuses = statuses),
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses)),
			);
		combineLatest(
			filters$,
			statuses$,
			(filters, statuses) => this.getSamples(this.statuses, filters))
			.subscribe();
	}

	private getSamples(statuses: SampleStatus[], filterList?: FilterList) {
		const predicate = filterList.asPredicate().trim();
		statuses.forEach(status => {
			const query = [
				predicate,
				`status.id == "${status.id}"`
			].join(' && ');
			this.sampleSrv.queryMany({ query, take: 6, sortBy: 'lastUpdatedDate' })
				.pipe(first())
				.subscribe(samples => this.kanbanSrv.setData(samples, status.id));
			this.sampleSrv.queryCount(query).pipe(first())
				.subscribe(total => this.kanbanSrv.setTotal(total, status.id));
		});
	}

	loadMore(col: KanbanColumn) {
		this.sampleSrv.queryMany({
			query: `status.id == "${col.id}" && deleted == false`,
			take: col.data.length + 6,
			sortBy: 'lastUpdatedDate'
		}).pipe(
			first()
		).subscribe(samples => this.kanbanSrv.setData(samples, col.id));
	}

	onColumnSelected(samples: Sample[]) {
		samples.forEach(sample => this.listSrv.selectOne(sample));
	}

	onColumnUnselected(samples: Sample[]) {
		samples.forEach(sample => this.listSrv.unselectOne(sample));
	}

	toggleMySamples() {
		throw Error('not implemented yet');
	}

	openCreateDlg() {
		throw Error('not implemented yet');
	}

	updateSampleStatus(event: KanbanDropEvent) {
		// if dropped in the same column do nothing
		if (event.to === event.from) {
			return;
		}
		// we update on the server
		this.sampleSrv.update({
			id: event.item.id,
			status: new SampleStatus({ id: event.to.id })
		}).subscribe();
	}

	onMultipleStatusUpdated(values: any[], status: SampleStatus) {
		values = values.map(val => ({ id: val.id, status }));
		this.kanbanSrv.updateMany(values);
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
		const text = `Delete ${itemIds.length} `
			+ (itemIds.length <= 1 ? 'sample' : 'samples');

		this.dlgSrv.open(ConfirmDialogComponent, { text }).pipe(
			switchMap(_ => this.listSrv.dataSrv.deleteMany(itemIds)),
		).subscribe(_ => {
			this.listSrv.selectionSrv.unselectAll();
			this.kanbanSrv.deleteItems(itemIds);
		});
	}
}
