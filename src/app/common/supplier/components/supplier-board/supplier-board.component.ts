import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { SupplierStatusService } from '~core/entity-services/supplier-status/supplier-status.service';
import { ListPageService } from '~core/list-page';
import { NEW_STATUS_ID } from '~core/models/status.model';
import { SupplierService } from '~entity-services';
import { ERM, Supplier, SupplierStatus } from '~models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { FilterList, FilterType } from '~shared/filters';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { translate } from '~utils';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'supplier-board-app',
	templateUrl: './supplier-board.component.html',
	styleUrls: ['./supplier-board.component.scss'],
	providers: [
		KanbanService
	]
})
export class SupplierBoardComponent extends AutoUnsub implements OnInit {

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
		public commonModalSrv: CommonModalService,
		public kanbanSrv: KanbanService,
		public dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		const filters$ = this.listSrv.filterList.valueChanges$.pipe(
			takeUntil(this._destroy$)
		);

		const statuses$ = this.supplierStatusSrv
			.queryAll(undefined, {
				sortBy: 'step',
				descending: false
			}).pipe(
				first(),
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses)),
			);

		combineLatest(
			filters$,
			statuses$,
			(filterList, statuses) => this.getSuppliers(statuses, filterList)
		).subscribe();
		this.selected$ = this.listSrv.selection$;
	}

	loadMore(col: KanbanColumn) {
		const query = this.getColQuery(col.id);
		this.supplierSrv.selectMany({
			query,
			take: col.data.length + this.amountLoaded,
			sortBy: 'lastUpdatedDate'
		}).pipe(first())
			.subscribe(suppliers => this.kanbanSrv.setData(suppliers, col.id));
	}

	private getSuppliers(statuses: SupplierStatus[], filterList: FilterList) {
		statuses.forEach(status => {
			const query = this.getColQuery(status.id, filterList);
			this.supplierSrv.selectMany({ query, take: this.amountLoaded, sortBy: 'lastUpdatedDate' }).
				pipe(
					first(),
					// we use selectCount instead of queryCount, since queryCount wasn't giving the latest values, when requerying
					switchMap(_ => this.supplierSrv.selectCount(query).pipe(first()), (suppliers, total) => ({ suppliers, total })),
				).subscribe(data => {
					this.kanbanSrv.setData(data.suppliers, status.id);
					this.kanbanSrv.setTotal(data.total, status.id);
				});
		});
	}

	// returns the query of the columns based on the parameters on the list srv and a constant query
	private getColQuery(colId: string, filterList?: FilterList) {
		const constQuery = colId !== NEW_STATUS_ID ?
			`status.id == "${colId}"` : `status == null`;
		const predicate = filterList ? filterList.asPredicate() : this.listSrv.filterList.asPredicate();
		return [
			predicate,
			constQuery
		].filter(x => x !== '')
			.join(' && ');
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
		const isNewStatus = event.to.id === NEW_STATUS_ID;
		this.supplierSrv.update({
			id: event.item.id,
			status: isNewStatus ? null : new SupplierStatus({ id: event.to.id })
		},
			Client.TEAM,
			isNewStatus ? 'status { id }' : ''
		).subscribe();
	}

	/** multiple */
	updateSupplierStatus(event: KanbanDropEvent) {
		const isNewStatus = event.to.id === NEW_STATUS_ID;
		const suppliers = event.items.map(id => ({
			id,
			status: isNewStatus ? null : new SupplierStatus({ id: event.to.id })
		}));
		this.supplierSrv.updateMany(
			suppliers,
			Client.TEAM,
			isNewStatus ? 'status { id }' : ''
		).subscribe();
	}

	onColumnSelected(suppliers: Supplier[]) {
		suppliers.forEach(supplier => this.listSrv.selectOne(supplier, true));
	}

	onColumnUnselected(suppliers: Supplier[]) {
		suppliers.forEach(supplier => this.listSrv.unselectOne(supplier, true));
	}

	onFavoriteAllSelected() {
		this.listSrv.onFavoriteAllSelected();
		const updated = this.listSrv.getSelectedIds()
			.map(id => ({ id, favorite: true }));
		this.kanbanSrv.updateMany(updated);
	}

	onUnfavoriteAllSelected() {
		this.listSrv.onUnfavoriteAllSelected();
		const updated = this.listSrv.getSelectedIds()
			.map(id => ({ id, favorite: false }));
		this.kanbanSrv.updateMany(updated);
	}

	onMultipleThumbUp(isCreated) {
		const updated = this.listSrv.onMultipleThumbUp(isCreated);
		this.kanbanSrv.updateMany(updated);
	}

	onMultipleThumbDown(isCreated) {
		const updated = this.listSrv.onMultipleThumbDown(isCreated);
		this.kanbanSrv.updateMany(updated);
	}

	deleteSelected() {
		const itemIds = this.listSrv.getSelectedIds();
		const del = translate('delete');
		const supplier = itemIds.length <= 1 ? translate('supplier') : translate('suppliers');
		const text = `${del} ${itemIds.length} ${supplier}`;

		this.dlgSrv.open(ConfirmDialogComponent, { text }).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			switchMap(_ => this.listSrv.dataSrv.deleteMany(itemIds)),
		).subscribe(_ => {
			this.listSrv.selectionSrv.unselectAll();
			this.kanbanSrv.deleteItems(itemIds);
		});
	}

	onMultipleStatusChange(status: SupplierStatus) {
		const updated = this.listSrv.getSelectedIds()
			.map(id => ({ id, status }));
		this.kanbanSrv.onExternalStatusChange(updated);
		this.supplierSrv.updateMany(updated).subscribe();
	}
}
