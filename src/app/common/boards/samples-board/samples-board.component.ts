import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { first, map, mergeMap, startWith, takeUntil, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { SampleService, SampleStatusService, UserService } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { ERM, Sample, SampleStatus } from '~core/erm';
import { DialogService } from '~shared/dialog';
import { FilterList, FilterType } from '~shared/filters';
import { KanbanColumn, KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { StatusUtils } from '~utils';
import { AutoUnsub } from '~utils/auto-unsub.component';


@Component({
	selector: 'samples-board-app',
	templateUrl: './samples-board.component.html',
	styleUrls: ['./samples-board.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamplesBoardComponent extends AutoUnsub implements OnInit {

	@Output() preview = new EventEmitter<undefined>();
	@Output() selectOne = new EventEmitter<Sample>();
	@Output() unselectOne = new EventEmitter<Sample>();

	columns$ = this.kanbanSrv.columns$;
	erm = ERM;
	amountLoaded = 15;

	// reminder, remember that in order to use kanbanservice, listSrv, etc, you have to set the providers on the parent component
	constructor(
		private sampleSrv: SampleService,
		private sampleStatusSrv: SampleStatusService,
		private listSrv: ListPageService<Sample, SampleService>,
		public dialogCommonSrv: DialogCommonService,
		public kanbanSrv: KanbanService,
		public kanbanSelectionSrv: KanbanSelectionService,
		public dlgSrv: DialogService,
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
				query: 'category != "refused"',
				sortBy: 'step',
				descending: false
			}).pipe(
				first(),
				// status null
				map(statuses => [{ id: StatusUtils.NEW_STATUS_ID, name: 'New Sample', category: StatusUtils.DEFAULT_STATUS_CATEGORY }, ...statuses]),
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses)),
			);

		combineLatest(
			filters$,
			statuses$,
		).pipe(
			mergeMap(([filterList, statuses]) => combineLatest(...this.getSampleColumns(statuses, filterList))),
		).subscribe(columns => this.kanbanSrv.setData(columns));
	}

	loadMore(col: KanbanColumn) {
		const query = this.getColQuery(col.id);
		this.sampleSrv.queryMany({
			query,
			take: col.data.length + this.amountLoaded,
			sortBy: 'lastUpdatedDate'
		}).subscribe(samples => this.kanbanSrv.setData([{ data: samples, id: col.id }]));
	}

	private getSampleColumns(statuses: SampleStatus[], filterList: FilterList) {
		return statuses.map(status => {
			const query = this.getColQuery(status.id, filterList);
			const samples$ = this.sampleSrv.queryMany({ query, take: this.amountLoaded, sortBy: 'lastUpdatedDate' });
			const total$ = this.sampleSrv.queryCount(query).pipe(first());
			return combineLatest(total$, samples$, (total, samples) => ({ id: status.id, data: samples, total }));
		});
	}

	// returns the query of the columns based on the parameters on the list srv
	private getColQuery(colId: string, filterList?: FilterList) {
		const constQuery = colId !== StatusUtils.NEW_STATUS_ID ?
			`status.id == "${colId}"` : `status == null`
			;
		const predicate = filterList ? filterList.asPredicate() : this.listSrv.filterList.asPredicate();
		return [
			predicate,
			constQuery
		].filter(x => x !== '')
			.join(' && ');
	}

	onUpdate(sample: Sample) {
		this.kanbanSrv.updateData(sample);
	}

	previewStatusUpdate(sample: Sample) {
		this.kanbanSrv.onExternalStatusChange([sample]);
	}

	onUpdateSampleStatus(event: KanbanDropEvent) {
		// if dropped in the same column do nothing
		if (event.to === event.from) {
			return;
		}
		// we update on the server
		const isNewStatus = event.to.id === StatusUtils.NEW_STATUS_ID;
		this.sampleSrv.update({
			id: event.item.id,
			status: isNewStatus ? null : new SampleStatus({ id: event.to.id })
		},
			Client.TEAM,
			isNewStatus ? 'status { id }' : ''
		).subscribe();
	}

	/** multiple */
	onUpdateSamplesStatus(event: KanbanDropEvent) {
		const isNewStatus = event.to.id === StatusUtils.NEW_STATUS_ID;
		const samples = event.items.map(id => ({
			id,
			status: isNewStatus ? null : new SampleStatus({ id: event.to.id })
		}));
		this.sampleSrv.updateMany(
			samples,
			Client.TEAM,
			isNewStatus ? 'status { id }' : ''
		).subscribe();
	}

	onSelectedOne(sample: Sample, column: KanbanColumn) {
		this.kanbanSelectionSrv.selectOne(sample, column);
	}

	onUnselectedOne(sample: Sample) {
		this.kanbanSelectionSrv.unselectOne(sample);
	}

}
