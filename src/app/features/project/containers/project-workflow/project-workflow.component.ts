import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map, takeUntil, tap } from 'rxjs/operators';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ProductService, ProductStatusService, ProjectService } from '~entity-services';
import { ProductQueries } from '~entity-services/product/product.queries';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { ERM, Product, Project } from '~models';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { statusProductToKanbanCol } from '~utils/kanban.utils';

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

	constructor(
		private route: ActivatedRoute,
		private projectSrv: ProjectService,
		private productSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		private workflowService: ProjectWorkflowFeatureService,
		private notificationSrv: NotificationService,
		private featureSrv: ProjectWorkflowFeatureService,
		public listSrv: ListPageService<Product, ProjectWorkflowFeatureService>,
		public commonDlgSrv: CommonDialogService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.PROJECT_WORKFLOW,
			entitySrv: this.featureSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			currentSort: { sortBy: 'category.name', descending: true },
			entityMetadata: ERM.PRODUCT
		});

		const id = this.route.parent.snapshot.params.id;
		this.project$ = this.projectSrv.queryOne(id);

		this.project$.pipe(
			takeUntil(this._destroy$)
		).subscribe(project => this.project = project);

		const products$ = this.productSrv.queryAll(ProductQueries.many, {
			query: `projects.id == "${id}"`,
			sortBy: 'lastUpdatedDate',
		}).pipe(
			// first(),
			// we lose the order when the product is updated
			// because apollo has no idea of how to reorder items unless we do
			// a refetch, but we re gonna do it on the front end
			map(products => products.sort(
				(a, b) => +(new Date(b.lastUpdatedDate)) - (+new Date(a.lastUpdatedDate)))
			)
		);

		const productStatuses$ = this.productStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused" AND category != "inspiration"',
				sortBy: 'step'
			}).pipe();

		this.columns$ = combineLatest(
			productStatuses$,
			products$,
			statusProductToKanbanCol
		);
	}

	updateProductStatus(event: KanbanDropEvent) {
		// if dropped in the same column do nothing
		if (event.to === event.from) {
			return;
		}
		this.productSrv.update({
			id: event.item.id,
			status: { id: event.to }
		}).subscribe();
	}

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

	/** updates the products with the new value votes */
	// multipleVotes(votes: Map<string, ProductVote[]>) {
	// 	votes.forEach((v, k) => this.update({ id: k, votes: v }));
	// }

	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg() {
		if (this.project) {
			this.featureSrv.getProjectProducts(this.project).pipe(first()).subscribe(products => {
				this.commonDlgSrv.openFindProductDlg(products, this.associateProductsWithProject.bind(this));
			});
		}
	}

	/**
	 * Deassociate the selected product from the current project
	 */
	deassociateProduct(product: Product) {
		this.featureSrv.manageProjectsToProductsAssociations([this.project], [], [product]).pipe(
			tap(() => {
				this.workflowService.refreshStatuses(this.project);
				this.notificationSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Products Updated',
					message: 'The products were updated in the project with success',
					timeout: 3500
				});
			})
		).subscribe();
	}

	/**
	 * Associate the selected products from the current project. This method is
	 * passed as callback for the "find products" dialog.
	 */
	associateProductsWithProject({ selectedProducts, unselectedProducts }: { selectedProducts: Product[], unselectedProducts: Product[] }) {
		return this.featureSrv.manageProjectsToProductsAssociations([this.project], selectedProducts, unselectedProducts).pipe(
			tap(() => {
				this.workflowService.refreshStatuses(this.project);
				this.notificationSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Products Updated',
					message: 'The products were updated in the project with success',
					timeout: 3500
				});
			})
		);
	}
}
