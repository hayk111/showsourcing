import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { first, switchMap, tap, takeUntil, map } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ProductStatusService } from '~core/entity-services/product-status/product-status.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ProductService } from '~entity-services';
import { ERM, Product, ProductStatus, ProductVote } from '~models';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { FilterList } from '~shared/filters';

@Component({
	selector: 'workspace-my-workflow-page-app',
	templateUrl: './my-workflow-page.component.html',
	styleUrls: ['./my-workflow-page.component.scss'],
	providers: [
		ListPageService,
		KanbanService
	]
})
export class MyWorkflowPageComponent extends AutoUnsub implements OnInit {
	columns$ = this.kanbanSrv.columns$;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;
	erm = ERM;

	constructor(
		private productSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		public listSrv: ListPageService<Product, ProductService>,
		public commonModalSrv: CommonModalService,
		public kanbanSrv: KanbanService,
		public dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.MY_WORKFLOW,
			entitySrv: this.productSrv,
			searchedFields: ['name'],
			entityMetadata: ERM.PRODUCT
		}, false);
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
				map(statuses => [{ id: null, name: 'New Product', category: 'new' }, ...statuses]),
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
		const query = col.id !== null ?
			`status.id == "${col.id}"`
			: `status == null`;
		this.productSrv.queryMany({
			query,
			take: col.data.length + 6,
			sortBy: 'lastUpdatedDate'
		}).pipe(
			first()
		).subscribe(products => this.kanbanSrv.setData(products, col.id));
	}

	private getProducts(statuses: ProductStatus[], filterList: FilterList) {
		const predicate = filterList.asPredicate();
		statuses.forEach(status => {
			const constQuery = status.id !== null ?
				`status.id == "${status.id}"`
				: `status == null`;

			const query = [
				predicate,
				constQuery
			].join(' && ');
			this.productSrv.queryMany({ query, take: 6, sortBy: 'lastUpdatedDate' })
				.pipe(first())
				.subscribe(prods => this.kanbanSrv.setData(prods, status.id));
			this.productSrv.queryCount(query).pipe(first())
				.subscribe(total => this.kanbanSrv.setTotal(total, status.id));
		});
	}

	onUpdate(product: Product) {
		this.kanbanSrv.updateData(product);
	}

	previewStatusUpdate(product: Product) {
		this.kanbanSrv.onExternalStatusChange([product]);
	}

	getColumnColor(status) {
		if (status.category === 'validated') {
			return 'var(--color-success)';
		}
		if (status.category === 'refused') {
			return 'var(--color-warn)';
		}
		if (!status.category) {
			return 'var(--color-accent)';
		}
		return 'var(--color-in-progress)';
	}

	getCurrentColumnFct(data) {
		return data.cat ? data.cat.id : '';
	}

	/** updates the products with the new value votes */
	multipleVotes(votes: Map<string, ProductVote[]>) {
		votes.forEach((v, k) => this.listSrv.update({ id: k, votes: v }));
	}

	onUpdateProductStatus(event: KanbanDropEvent) {
		// if dropped in the same column do nothing
		if (event.to === event.from) {
			return;
		}
		// we update on the server
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
		const text = `Delete ${itemIds.length} `
			+ (itemIds.length <= 1 ? 'product' : 'products');

		this.dlgSrv.open(ConfirmDialogComponent, { text }).pipe(
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
