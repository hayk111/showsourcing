import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest, Observable, concat, zip, merge } from 'rxjs';
import { filter, first, switchMap, takeUntil, tap, mergeMap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ProductStatusService } from '~core/entity-services/product-status/product-status.service';
import { ListPageService, SelectionService } from '~core/list-page';
import { ProductService } from '~entity-services';
import { ERM, Product, ProductStatus, EntityName } from '~models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { FilterList, FilterType } from '~shared/filters';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.class';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { StatusUtils, translate } from '~utils';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';

@Component({
	selector: 'products-board-app',
	templateUrl: './products-board.component.html',
	styleUrls: ['./products-board.component.scss'],
	providers: [
		KanbanService
	]
})
export class ProductsBoardComponent extends AutoUnsub implements OnInit {

	@Output() preview = new EventEmitter<undefined>();
	@Output() selectOne = new EventEmitter<Product>();
	@Output() unselectOne = new EventEmitter<Product>();


	columns$ = this.kanbanSrv.columns$;
	erm = ERM;
	amountLoaded = 15;

	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.ARCHIVED,
		FilterType.CATEGORY,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.FAVORITE,
		FilterType.PRODUCT_STATUS,
		FilterType.PROJECTS,
		FilterType.SUPPLIER,
		FilterType.TAGS
	];

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
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses)),
			);

		combineLatest(
			filters$,
			statuses$
		).pipe(
			mergeMap(([filterList, statuses]) => combineLatest(...this.getProductByStatus(statuses, filterList))),
		).subscribe(columns => {
			columns.forEach(column => {
				this.kanbanSrv.setData(column.products, column.status.id);
				this.kanbanSrv.setTotal(column.total, column.status.id);
			});
		});
	}

	loadMore(col: KanbanColumn) {
		const query = this.getColQuery(col.id);
		this.productSrv.selectMany({
			query,
			take: col.data.length + this.amountLoaded,
			sortBy: 'lastUpdatedDate'
		}).pipe(first())
			.subscribe(products => this.kanbanSrv.setData(products, [col.id]));
	}

	private getProductByStatus(statuses: ProductStatus[], filterList: FilterList): Observable<any>[] {
		return statuses.map(status => {
			const query = this.getColQuery(status.id, filterList);
			return this.productSrv.selectMany({ query, take: this.amountLoaded, sortBy: 'lastUpdatedDate' }).
				pipe(
					first(),
					// we use selectCount instead of queryCount,
					// since queryCount wasn't giving the latest values, when requerying
					switchMap(
						_ => this.productSrv.selectCount(query).pipe(first()),
						(products, total) => ({ products, total, status })
					)
				);
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
		this.productSrv.update({
			id: event.item.id,
			status: new ProductStatus({ id: event.to.id })
		}).subscribe();
	}

	/** multiple */
	updateProductsStatus(event: KanbanDropEvent) {
		const products = event.items.map(id => ({
			id,
			status: new ProductStatus({ id: event.to.id })
		}));
		this.productSrv.updateMany(products).subscribe();
	}

	onSelectedOne(product: Product, column: KanbanColumn) {
		this.kanbanSelectionSrv.selectOne(product, column);
	}

	onUnselectedOne(product: Product, column: KanbanColumn) {
		this.kanbanSelectionSrv.unselectOne(product, column);
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
