import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ProductStatusService } from '~core/entity-services/product-status/product-status.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ProductService } from '~entity-services';
import { ERM, Product, ProductVote, ProductStatus } from '~models';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { ListQuery } from '~core/entity-services/_global/list-query.interface';
import { makeColumns } from '~utils/kanban.utils';

@Component({
	selector: 'workspace-my-workflow-page-app',
	templateUrl: './my-workflow-page.component.html',
	styleUrls: ['./my-workflow-page.component.scss'],
	providers: [
		ListPageService
	]
})
export class MyWorkflowPageComponent extends AutoUnsub implements OnInit {
	columns$: Observable<KanbanColumn[]>;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;
	private productsMap = new Map<string, ListQuery<Product>>();
	private totalMap = new Map<string, Observable<number>>();

	constructor(
		private productSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		public listSrv: ListPageService<Product, ProductService>,
		public commonModalSrv: CommonModalService
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

		const productStatuses$ = this.productStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused"',
				sortBy: 'step',
				descending: false
			})
			.pipe();

		this.columns$ = productStatuses$.pipe(
			tap(statuses => this.getProducts(statuses)),
			switchMap(statuses => makeColumns(statuses, this.productsMap, this.totalMap)),
		);

		this.selected$ = this.listSrv.selection$;
	}

	loadMore(col: KanbanColumn) {
		this.productsMap.get(col.id).fetchMore().subscribe();
	}

	private getProducts(statuses: ProductStatus[]) {
		statuses.forEach(status => {
			const query = `status.id == "${status.id}"`;
			const prod$ = this.productSrv.getListQuery({ query, take: 6 });
			const total$ = this.productSrv.queryCount(query);
			this.productsMap.set(status.id, prod$);
			this.totalMap.set(status.id, total$);
		});
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

	onUpdateProductStatus({ target, droppedElement }) {
		if (droppedElement) {
			droppedElement.forEach(element => {
				this.productSrv
					.update({ id: element.id, status: { id: target.id } })
					.subscribe();
			});
			this.listSrv.unselectAll();
		}
	}

	onColumnSelected(products: Product[]) {
		products.forEach(prod => this.listSrv.selectOne(prod, true));
	}

	onColumnUnselected(products: Product[]) {
		products.forEach(prod => this.listSrv.unselectOne(prod, true));
	}

}
