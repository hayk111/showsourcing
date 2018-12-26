import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
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
import { KanbanDropEvent } from '~shared/kanban/interfaces';

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
	private totalMap = new Map<string, ListQuery<number>>();

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
			const prod$ = this.productSrv.getListQuery({ query, take: 6, sortBy: 'lastUpdatedDate' });
			const total$ = this.productSrv.customQuery({
				query
			}, `query productsCount($query: String) {
				productsCount(query: $query)
			}`);
			// unfortunately we have to filter a second time on the front end
			// because optimistic UI doesn't take the query into account
			prod$.items$ = prod$.items$.pipe(
				map(products => products
					.filter(prod => prod.status.id === status.id)
				),
				tap(d => {
					const _status = status;
					debugger;
				})
			);
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

	onUpdateProductStatus(event: KanbanDropEvent) {
		// if dropped in the same column do nothing
		if (event.to === event.from) {
			return;
		}
		// we update on the server
		this.productSrv.update({
			id: event.item.id,
			status: new ProductStatus({ id: event.to.id })
		}).pipe(
			// refetch so we get the info..
			switchMap(_ => forkJoin(
				this.totalMap.get(event.to.id).refetch({}),
				this.totalMap.get(event.from.id).refetch({}),
				this.productsMap.get(event.to.id).refetch({ take: event.to.data.length }),
				this.productsMap.get(event.from.id).refetch({ take: event.from.data.length }),
			))
		).subscribe();
	}

	/** multiple */
	updateProductsStatus(event: KanbanDropEvent) {
		const products = event.items.map(id => ({
			id,
			status: new ProductStatus({ id: event.to.id })
		}));
		this.productSrv.updateMany(products).pipe(
			// refetch so we get the info..
			switchMap(_ => forkJoin(
				this.totalMap.get(event.to.id).refetch({}),
				this.totalMap.get(event.from.id).refetch({}),
				this.productsMap.get(event.to.id).refetch({ take: event.to.data.length }),
				this.productsMap.get(event.from.id).refetch({ take: event.from.data.length }),
			))
		).subscribe();
	}

	onColumnSelected(products: Product[]) {
		products.forEach(prod => this.listSrv.selectOne(prod, true));
	}

	onColumnUnselected(products: Product[]) {
		products.forEach(prod => this.listSrv.unselectOne(prod, true));
	}

}
