import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
	filter,
	first,
	mergeMap,
	switchMap,
	takeUntil,
	tap
} from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import {
	ERM,
	Supplier,
	SupplierService,
	SupplierStatus,
	SupplierStatusService
} from '~core/erm';
import { ListPageService, SelectionService } from '~core/list-page';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { FilterList, FilterType } from '~shared/filters';
import { FilterService } from '~shared/filters/services/filter.service';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-interface.class';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { translate } from '~utils';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'suppliers-board-app',
	templateUrl: './suppliers-board.component.html',
	styleUrls: ['./suppliers-board.component.scss'],
	providers: [KanbanService]
})
export class SuppliersBoardComponent extends AutoUnsub implements OnInit {
	@Input() selection: Observable<Map<string, any>>;
	@Output() preview = new EventEmitter<undefined>();
	@Output() selectOne = new EventEmitter<Supplier>();
	@Output() unselectOne = new EventEmitter<Supplier>();

	columns$ = this.kanbanSrv.columns$;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;
	erm = ERM;
	amountLoaded = 15;

	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.ARCHIVED,
		FilterType.CATEGORY,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.FAVORITE,
		FilterType.SUPPLIER_STATUS,
		FilterType.PROJECTS,
		FilterType.SUPPLIER,
		FilterType.TAGS
	];

	constructor(
		private supplierSrv: SupplierService,
		private supplierStatusSrv: SupplierStatusService,
		private listSrv: ListPageService<Supplier, SupplierService>,
		public dialogCommonSrv: DialogCommonService,
		public kanbanSrv: KanbanService,
		public dlgSrv: DialogService,
		private filterSrv: FilterService,
		private selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		const filters$ = this.filterSrv.filterList.valueChanges$.pipe(
			takeUntil(this._destroy$)
		);

		const statuses$ = this.supplierStatusSrv
			.queryAll(undefined, {
				sortBy: 'step',
				descending: false
			})
			.pipe(
				first(),
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses))
			);

		combineLatest(filters$, statuses$)
			.pipe(
				mergeMap(([filterList, statuses]) =>
					combineLatest(...this.getSupplierColumns(statuses, filterList))
				)
			)
			.subscribe(columns => this.kanbanSrv.setData(columns));
	}

	loadMore(col: KanbanColumn) {
		const query = this.getColQuery(col.id);
		this.supplierSrv
			.selectMany({
				query,
				take: col.data.length + this.amountLoaded,
				sortBy: 'lastUpdatedDate'
			})
			.pipe(first())
			.subscribe(suppliers =>
				this.kanbanSrv.setData([{ id: col.id, data: suppliers }])
			);
	}

	private getSupplierColumns(
		statuses: SupplierStatus[],
		filterList: FilterList
	) {
		return statuses.map(status => {
			const query = this.getColQuery(status.id, filterList);
			const suppliers$ = this.supplierSrv.queryMany({
				query,
				take: this.amountLoaded,
				sortBy: 'lastUpdatedDate'
			});
			const total$ = this.supplierSrv.queryCount(query);
			return combineLatest(suppliers$, total$, (suppliers, total) => ({
				id: status.id,
				data: suppliers,
				total
			}));
		});
	}

	// returns the query of the columns based on the parameters on the list srv and a constant query
	private getColQuery(colId: string, filterList?: FilterList) {
		const constQuery = `status.id == "${colId}"`;
		const predicate = filterList
			? filterList.asPredicate()
			: this.filterSrv.filterList.asPredicate();
		return [predicate, constQuery].filter(x => x !== '').join(' && ');
	}

	onUpdate(supplier: Supplier) {
		this.kanbanSrv.updateData(supplier);
	}

	previewStatusUpdate(supplier: Supplier) {
		this.kanbanSrv.onExternalStatusChange([supplier]);
	}

	onUpdateSupplierStatus(event: KanbanDropEvent) {
		// if dropped in the same column do nothing
		if (event.to === event.from) {
			return;
		}
		// we update on the server
		this.supplierSrv
			.update({
				id: event.item.id,
				status: new SupplierStatus({ id: event.to.id })
			})
			.subscribe();
	}

	/** multiple */
	updateSupplierStatus(event: KanbanDropEvent) {
		const suppliers = event.items.map(id => ({
			id,
			status: new SupplierStatus({ id: event.to.id })
		}));
		this.supplierSrv.updateMany(suppliers).subscribe();
	}

	onColumnSelected(suppliers: Supplier[]) {
		suppliers.forEach(supplier => this.selectionSrv.selectOne(supplier));
	}

	onColumnUnselected(suppliers: Supplier[]) {
		suppliers.forEach(supplier => this.selectionSrv.unselectOne(supplier));
	}

	onFavoriteAllSelected() {
		const updated = this.selectionSrv
			.getSelectedIds()
			.map(id => ({ id, favorite: true }));
		this.kanbanSrv.updateMany(updated);
	}

	onUnfavoriteAllSelected() {
		const updated = this.selectionSrv
			.getSelectedIds()
			.map(id => ({ id, favorite: false }));
		this.kanbanSrv.updateMany(updated);
	}

	deleteSelected() {
		const itemIds = this.selectionSrv.getSelectedIds();
		const del = translate('delete');
		const supplier =
			itemIds.length <= 1 ? translate('supplier') : translate('suppliers');
		const text = `${del} ${itemIds.length} ${supplier}`;

		this.dlgSrv
			.open(ConfirmDialogComponent, { text })
			.pipe(
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				switchMap(_ => this.listSrv.dataSrv.deleteMany(itemIds))
			)
			.subscribe(_ => {
				this.selectionSrv.unselectAll();
				this.kanbanSrv.deleteItems(itemIds);
			});
	}

	onMultipleStatusChange(status: SupplierStatus) {
		const updated = this.selectionSrv
			.getSelectedIds()
			.map(id => ({ id, status }));
		this.kanbanSrv.onExternalStatusChange(updated);
		this.supplierSrv.updateMany(updated).subscribe();
	}
}
