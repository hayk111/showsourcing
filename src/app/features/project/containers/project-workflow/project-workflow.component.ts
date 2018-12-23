import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, forkJoin, of, zip, merge } from 'rxjs';
import { map, takeUntil, switchMap, tap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ProductService, ProductStatusService, ProjectService } from '~entity-services';
import { ProductQueries } from '~entity-services/product/product.queries';
import { ProjectFeatureService } from '~features/project/services';
import { ERM, Product, Project, ProductStatus } from '~models';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { ListQuery } from '~core/entity-services/_global/list-query.interface';
import { statusToKanbanCol, makeColumns } from '~utils/kanban.utils';

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
	project: Project;
	private productsMap = new Map<string, ListQuery<Product>>();
	private totalMap = new Map<string, Observable<number>>();

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

		// const products$ = this..items$.pipe(
		// 	// we lose the order when the product is updated
		// 	// because apollo has no idea of how to reorder items unless we do
		// 	// a refetch, but we re gonna do it on the front end
		// 	map(products => products.sort(
		// 		(a, b) => +(new Date(b.lastUpdatedDate)) - (+new Date(a.lastUpdatedDate)))
		// 	)
		// );

		const productStatuses$ = this.productStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused" AND category != "inspiration"',
				sortBy: 'step',
				descending: false,
			}).pipe(
				map(statuses => [{ id: null, name: 'New Product', category: 'new' }, ...statuses])
			);

		this.columns$ = productStatuses$.pipe(
			tap(statuses => this.getProducts(statuses)),
			switchMap(statuses => makeColumns(statuses, this.productsMap, this.totalMap)),
		);
	}


	private getProducts(statuses: ProductStatus[]) {
		statuses.forEach(status => {
			const query = `projects.id == "${this.project.id}" AND status.id == "${status.id}"`;
			const prod$ = this.productSrv.getListQuery({ query });
			const total$ = this.productSrv.queryCount(query);
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
		}).subscribe();
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
			zip(_ => this.listSrv.refetch())
		).subscribe();
	}

}
