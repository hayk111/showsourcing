import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ProductStatusService } from '~core/entity-services/product-status/product-status.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { NEW_STATUS_ID } from '~core/models/status.model';
import { ProductService } from '~entity-services';
import { ERM, Product, ProductStatus } from '~models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { FilterList, FilterType } from '~shared/filters';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { translate } from '~utils';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'product-board-app',
	templateUrl: './product-board.component.html',
	styleUrls: ['./product-board.component.scss'],
	providers: [
		KanbanService
	]
})
export class ProductBoardComponent extends AutoUnsub implements OnInit {

	@Input() selection: Observable<Map<string, any>>;
	@Output() preview = new EventEmitter<undefined>();
	@Output() selectOne = new EventEmitter<Product>();
	@Output() unselectOne = new EventEmitter<Product>();


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
		FilterType.PRODUCT_STATUS,
		FilterType.PROJECTS,
		FilterType.SUPPLIER,
		FilterType.TAGS
	];

	constructor(
		private productSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		private listSrv: ListPageService<Product, ProductService>,
		public commonModalSrv: CommonModalService,
		public kanbanSrv: KanbanService,
		public dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		this.columns$.subscribe(columns => {
	    console.log('TCL: ProductBoardComponent -> ngOnInit -> columns', columns);
		});
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
				// adding new status
				map(statuses => [{ id: NEW_STATUS_ID, name: 'New Product', category: 'new' }, ...statuses]),
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses)),
			);

		combineLatest(
			filters$,
			statuses$,
			(filterList, statuses) => this.getProducts(statuses, filterList)
		).subscribe();
		this.selected$ = this.listSrv.selection$;
	}

	loadMore(col: KanbanColumn) {
		const query = this.getColQuery(col.id);
		this.productSrv.selectMany({
			query,
			take: col.data.length + this.amountLoaded,
			sortBy: 'lastUpdatedDate'
		}).pipe(first())
			.subscribe(products => this.kanbanSrv.setData(products, col.id));
	}

	private getProducts(statuses: ProductStatus[], filterList: FilterList) {
		statuses.forEach(status => {
			const query = this.getColQuery(status.id, filterList);
			this.productSrv.selectMany({ query, take: this.amountLoaded, sortBy: 'lastUpdatedDate' }).
				pipe(
					first(),
					// we use selectCount instead of queryCount, since queryCount wasn't giving the latest values, when requerying
					switchMap(_ => this.productSrv.selectCount(query).pipe(first()), (prods, total) => ({ prods, total })),
				).subscribe(data => {
					this.kanbanSrv.setData(data.prods, status.id);
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
		const isNewStatus = event.to.id === NEW_STATUS_ID;
		this.productSrv.update({
			id: event.item.id,
			status: isNewStatus ? null : new ProductStatus({ id: event.to.id })
		},
			Client.TEAM,
			isNewStatus ? 'status { id }' : ''
		).subscribe();
	}

	/** multiple */
	updateProductsStatus(event: KanbanDropEvent) {
		const isNewStatus = event.to.id === NEW_STATUS_ID;
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

	onColumnSelected(products: Product[]) {
		products.forEach(prod => this.listSrv.selectOne(prod, true));
	}

	onColumnUnselected(products: Product[]) {
		products.forEach(prod => this.listSrv.unselectOne(prod, true));
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
