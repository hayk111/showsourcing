import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { first, map, mergeMap, startWith, takeUntil, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { SampleService, SampleStatusService, UserService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, Sample, SampleStatus } from '~core/models';
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
		const constQuery = `status.id == "${colId}"`;
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
		this.sampleSrv.update(
			{
				id: event.item.id,
				status: new SampleStatus({ id: event.to.id })
			}
		).subscribe();
	}

	/** multiple */
	onUpdateSamplesStatus(event: KanbanDropEvent) {
		const samples = event.items.map(id => ({
			id,
			status: new SampleStatus({ id: event.to.id })
		}));
		this.sampleSrv.updateMany(
			samples
		).subscribe();
	}

	onSelectedOne(sample: Sample, column: KanbanColumn) {
		this.kanbanSelectionSrv.selectOne(sample, column);
	}

	onUnselectedOne(sample: Sample) {
		this.kanbanSelectionSrv.unselectOne(sample);
	}

}
