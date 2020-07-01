import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output
} from '@angular/core';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import {
	ERM,
	Sample,
	SampleService,
	SampleStatus,
	SampleStatusService,
	UserService
} from '~core/erm';
import { DialogService } from '~shared/dialog';
import { FilterList } from '~shared/filters';
import { FilterService } from '~shared/filters/services/filter.service';
import { KanbanColumn, KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { StatusUtils } from '~utils';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { SelectionService } from '~core/list-page2';

@Component({
	selector: 'samples-board-app',
	templateUrl: './samples-board.component.html',
	styleUrls: ['./samples-board.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamplesBoardComponent extends AutoUnsub {
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
		public dialogCommonSrv: DialogCommonService,
		public kanbanSrv: KanbanService,
		public kanbanSelectionSrv: KanbanSelectionService,
		public dlgSrv: DialogService,
		private userSrv: UserService,
		private filterSrv: FilterService,
		private selectionSrv: SelectionService
	) {
		super();
	}

	loadMore(col: KanbanColumn) {
		const query = this.getColQuery(col.id);
		this.sampleSrv
			.queryMany({
				query,
				take: col.data.length + this.amountLoaded,
				sortBy: 'lastUpdatedDate'
			})
			.subscribe(samples =>
				this.kanbanSrv.setData([{ data: samples, id: col.id }])
			);
	}

	private getSampleColumns(statuses: SampleStatus[], filterList: FilterList) {
		return statuses.map(status => {
			const query = this.getColQuery(status.id, filterList);
			const samples$ = this.sampleSrv.queryMany({
				query,
				take: this.amountLoaded,
				sortBy: 'lastUpdatedDate'
			});
			const total$ = this.sampleSrv.queryCount(query).pipe(first());
			return combineLatest(total$, samples$, (total, samples) => ({
				id: status.id,
				data: samples,
				total
			}));
		});
	}

	// returns the query of the columns based on the parameters on the list srv
	private getColQuery(colId: string, filterList?: FilterList) {
		const constQuery =
			colId !== StatusUtils.NEW_STATUS_ID
				? `status.id == "${colId}"`
				: `status == null`;
		const predicate = filterList
			? filterList.asPredicate()
			: this.filterSrv.filterList.asPredicate();
		return [predicate, constQuery].filter(x => x !== '').join(' && ');
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
		this.sampleSrv
			.update(
				{
					id: event.item.id,
					status: isNewStatus ? null : new SampleStatus({ id: event.to.id })
				},
				isNewStatus ? 'status { id }' : ''
			)
			.subscribe();
	}

	/** multiple */
	onUpdateSamplesStatus(event: KanbanDropEvent) {
		const isNewStatus = event.to.id === StatusUtils.NEW_STATUS_ID;
		const samples = event.items.map(id => ({
			id,
			status: isNewStatus ? null : new SampleStatus({ id: event.to.id })
		}));
		this.sampleSrv
			.updateMany(samples, isNewStatus ? 'status { id }' : '')
			.subscribe();
	}

	onSelectedOne(sample: Sample, column: KanbanColumn) {
		this.kanbanSelectionSrv.selectOne(sample, column);
	}

	onUnselectedOne(sample: Sample) {
		this.kanbanSelectionSrv.unselectOne(sample);
	}
}
