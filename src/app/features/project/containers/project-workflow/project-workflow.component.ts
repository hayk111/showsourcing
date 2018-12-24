import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, takeUntil, tap, mergeMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListQuery } from '~core/entity-services/_global/list-query.interface';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ProductService, ProductStatusService, ProjectService } from '~entity-services';
import { ProjectFeatureService } from '~features/project/services';
import { ERM, Product, ProductStatus, Project } from '~models';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { makeColumns } from '~utils/kanban.utils';
import { ProductsCardViewComponent } from '~common/product';

@Component({
	selector: 'project-workflow-app',
	templateUrl: './project-workflow.component.html',
	styleUrls: ['./project-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class ProjectWorkflowComponent extends AutoUnsub implements OnInit {
	project$: Observable<Project>;
	columns$: Observable<KanbanColumn[]>;
	columns: KanbanColumn;
	project: Project;
	private productsMap = new Map<string, ListQuery<Product>>();
	private totalMap = new Map<string, ListQuery<number>>();

	constructor(
		private route: ActivatedRoute,
		private projectSrv: ProjectService,
		private productSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		private featureSrv: ProjectFeatureService,
		public listSrv: ListPageService<Product, ProjectFeatureService>,
		public commonModalSrv: CommonModalService
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.project$ = this.projectSrv.queryOne(id);

		this.listSrv.setup({
			key: ListPageKey.PROJECT_WORKFLOW,
			entitySrv: this.productSrv,
			entityMetadata: ERM.PRODUCT
		}, false);

		this.project$.pipe(
			takeUntil(this._destroy$)
		).subscribe(project => this.project = project);

		const productStatuses$ = this.productStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused"',
				sortBy: 'step',
				descending: false,
			}).pipe(
				map(statuses => [{ id: null, name: 'New Product', category: 'new' }, ...statuses])
			);

		this.columns$ = productStatuses$.pipe(
			tap(statuses => this.getProducts(statuses)),
			mergeMap(statuses => makeColumns(statuses, this.productsMap, this.totalMap)),
		);
		this.columns$.pipe(takeUntil(this._))
	}

	loadMore(col: KanbanColumn) {
		this.productsMap.get(col.id).fetchMore().subscribe();
	}

	private getProducts(statuses: ProductStatus[]) {
		statuses.forEach(status => {
			const query = `projects.id == "${this.project.id}" AND status.id == "${status.id}"`;
			const prod$ = this.productSrv.getListQuery({ query, take: 8, sortBy: 'lastUpdatedDate' });
			const total$ = this.productSrv.customQuery({
				query, take: 8, sortBy: 'lastUpdatedDate'
			}, `query productsCount($query: String) {
				productsCount(query: $query)
			}`);
			// unfortunately we have to filter a second time on the front end
			// because optimistic UI doesn't take the query into account
			prod$.items$ = prod$.items$.pipe(
				map(products => products
					.filter(prod => prod.status.id === status.id)
				)
			);
			this.productsMap.set(status.id, prod$);
			this.totalMap.set(status.id, total$);
		});
	}

	updateProductStatus(event: KanbanDropEvent) {
		// if dropped in the same column do nothing
		if (event.to === event.from) {
			return;
		}
		this.productSrv.update({
			id: event.item.id,
			status: new ProductStatus({ id: event.to })
		}).pipe(
			switchMap(_ => forkJoin(
				this.productsMap.get(event.from).refetch({}),
				this.productsMap.get(event.to).refetch({}),
				this.totalMap.get(event.to).refetch({}),
				this.totalMap.get(event.from).refetch({})
			))
		).subscribe();
	}

	/** multiple */
	updateProductsStatus(event: { to: any, items: any[] }) {
		const products = event.items.map(id => ({
			id,
			status: { id: event.to }
		}));
		this.productSrv.updateMany(products).subscribe();
	}

	onColumnSelected(products: Product[]) {
		products.forEach(prod => this.listSrv.selectOne(prod, true));
	}

	onColumnUnselected(products: Product[]) {
		products.forEach(prod => this.listSrv.unselectOne(prod, true));
	}

	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg() {
		this.featureSrv.openFindProductDlg(this.project).pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

}
