import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, first, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ProductStatusService } from '~core/orm/services/product-status/product-status.service';
import { ListPageService } from '~core/list-page';
import { ProductService } from '~core/orm/services';
import { ERM, Product, ProductStatus } from '~core/orm/models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { FilterList } from '~shared/filters';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-interface.class';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { StatusUtils, translate } from '~utils';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'products-board-app',
	templateUrl: './products-board.component.html',
	styleUrls: ['./products-board.component.scss']
})
export class ProductsBoardComponent extends AutoUnsub implements OnInit {

	@Output() preview = new EventEmitter<undefined>();
	@Output() selectOne = new EventEmitter<Product>();
	@Output() unselectOne = new EventEmitter<Product>();

	columns$ = this.kanbanSrv.columns$;
	erm = ERM;
	amountLoaded = 15;

	// reminder, remember that in order to use kanbanservice, listSrv, etc, you have to set the providers on the parent component
	constructor(
		private productSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		private listSrv: ListPageService<Product, ProductService>,
		public dialogCommonSrv: DialogCommonService,
		public kanbanSrv: KanbanService,
		public kanbanSelectionSrv: KanbanSelectionService,
		public dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		const filters$ = this.listSrv.filterList.valueChanges$.pipe(
			takeUntil(this._destroy$)
		);

		const statuses$ = this.productStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused"',
				sortBy: 'step',
				descending: false
			}).pipe(
				first(),
				// status null
				map(statuses => [{ id: StatusUtils.NEW_STATUS_ID, name: 'New Product', category: StatusUtils.DEFAULT_STATUS_CATEGORY }, ...statuses]),
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses)),
			);

		combineLatest(
			filters$,
			statuses$
		).pipe(
			mergeMap(([filterList, statuses]) => combineLatest(...this.getProductColumns(statuses, filterList))
				// at this point we work with the local data
				.pipe(first())),
		).subscribe(columns => {
			this.kanbanSrv.setData(columns);
		});
	}

	loadMore(col: KanbanColumn) {
		const query = this.getColQuery(col.id);
		this.productSrv.queryMany({
			query,
			take: col.data.length + this.amountLoaded,
			sortBy: 'lastUpdatedDate'
		}).subscribe(products => this.kanbanSrv.setData([{ data: products, id: col.id }]));
	}

	private getProductColumns(statuses: ProductStatus[], filterList: FilterList): Observable<any>[] {
		return statuses.map(status => {
			const query = this.getColQuery(status.id, filterList);
			const products$ = this.productSrv.queryMany({ query, take: this.amountLoaded, sortBy: 'lastUpdatedDate' });
			const total$ = this.productSrv.queryCount(query).pipe(first());
			return combineLatest(total$, products$, (total, products) => ({ id: status.id, data: products, total }));
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

	onUpdate(product: Product) {
		this.kanbanSrv.updateData(product);
	}

	previewStatusUpdate(product: Product) {
		this.kanbanSrv.onExternalStatusChange([product]);
	}

	onUpdateProductStatus(event: KanbanDropEvent) {
		// if dropped in the same column do nothing
		if (event.to === event.from) {
			return;
		}
		// we update on the server
		const isNewStatus = event.to.id === StatusUtils.NEW_STATUS_ID;
		this.productSrv.update({
			id: event.item.id,
			status: isNewStatus ? null : new ProductStatus({ id: event.to.id })
		},
			Client.TEAM,
			isNewStatus ? 'status { id }' : ''
		).subscribe();
	}

	/** multiple */
	onUpdateProductsStatus(event: KanbanDropEvent) {
		const isNewStatus = event.to.id === StatusUtils.NEW_STATUS_ID;
		const products = event.items.map(id => ({
			id,
			status: isNewStatus ? null : new ProductStatus({ id: event.to.id })
		}));
		this.productSrv.updateMany(
			products,
			Client.TEAM,
			isNewStatus ? 'status { id }' : ''
		).subscribe();
	}

	onSelectedOne(product: Product, column: KanbanColumn) {
		this.kanbanSelectionSrv.selectOne(product, column);
	}

	onUnselectedOne(product: Product) {
		this.kanbanSelectionSrv.unselectOne(product);
	}

	deleteSelected() {
		const itemIds = this.listSrv.getSelectedIds();
		const del = translate('delete');
		const prod = itemIds.length <= 1 ? translate('product') : translate('products');
		const text = `${del} ${itemIds.length} ${prod}`;

		this.dlgSrv.open(ConfirmDialogComponent, { text }).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			switchMap(_ => this.listSrv.dataSrv.deleteMany(itemIds)),
		).subscribe(_ => {
			this.listSrv.selectionSrv.unselectAll();
			this.kanbanSrv.deleteItems(itemIds);
		});
	}

	onMultipleStatusChange(status: ProductStatus) {
		const updated = this.listSrv.getSelectedIds()
			.map(id => ({ id, status }));
		this.kanbanSrv.onExternalStatusChange(updated);
		this.productSrv.updateMany(updated).subscribe();
	}
}
