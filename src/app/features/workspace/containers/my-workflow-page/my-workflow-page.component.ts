import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, tap, switchMap, first } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ProductStatusService } from '~core/entity-services/product-status/product-status.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ProductService } from '~entity-services';
import { ERM, Product, ProductVote, ProductStatus } from '~models';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { ListQuery } from '~core/entity-services/_global/list-query.interface';
import { makeColumns } from '~utils/kanban.utils';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanService } from '~shared/kanban/services/kanban.service';

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

	constructor(
		private productSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		public listSrv: ListPageService<Product, ProductService>,
		public commonModalSrv: CommonModalService,
		public kanbanSrv: KanbanService,
		private cd: ChangeDetectorRef
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

		this.productStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused"',
				sortBy: 'step',
				descending: false
			}).pipe(
				first(),
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses)),
			).subscribe(statuses => this.getProducts(statuses));
		this.selected$ = this.listSrv.selection$;
	}

	loadMore(col: KanbanColumn) {
		// this.productsMap.get(col.id).fetchMore().subscribe();
	}

	private getProducts(statuses: ProductStatus[]) {
		statuses.forEach(status => {
			const query = `status.id == "${status.id}"`;
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

}
