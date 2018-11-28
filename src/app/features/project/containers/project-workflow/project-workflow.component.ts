import { ChangeDetectorRef, Component, NgModuleRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { ProductService, ProjectService, ProductStatusTypeService } from '~global-services';
import { ERM, Product, ERM_TOKEN, Project, ProductStatus } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { NotificationService, NotificationType } from '~shared/notifications';
import {
	FindProductsDialogComponent,
} from '~shared/product-common/containers/find-products-dialog/find-products-dialog.component';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { statusProductToKanbanCol } from '~utils/kanban.utils';
import { ProductQueries } from '~global-services/product/product.queries';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { ListPageProviders, ProviderKey } from '~shared/list-page/list-page-providers.class';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'project-workflow-app',
	templateUrl: './project-workflow.component.html',
	styleUrls: ['./project-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageProviders.getProviders(ProviderKey.PROJECT_WORKFLOW, ERM.PRODUCT),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.PRODUCT }
	]
})
export class ProjectWorkflowComponent extends AutoUnsub implements OnInit {
	project$: Observable<Project>;
	columns$: Observable<KanbanColumn[]>;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;
	project: Project;

	constructor(
		protected route: ActivatedRoute,
		protected projectSrv: ProjectService,
		protected productSrv: ProductService,
		protected productStatusSrv: ProductStatusTypeService,
		protected router: Router,
		protected thumbSrv: ThumbService,
		protected workflowService: ProjectWorkflowFeatureService,
		protected notificationSrv: NotificationService,
		protected featureSrv: ProjectWorkflowFeatureService,
		protected viewSrv: ListPageViewService<Product>,
		public dataSrv: ListPageDataService<Product, ProjectWorkflowFeatureService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			initialSortBy: 'category.name'
		});
		this.dataSrv.init();

		const id = this.route.parent.snapshot.params.id;
		this.project$ = this.projectSrv.queryOne(id);
		this.selected$ = this.selectionSrv.selection$;

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
			status: new ProductStatus({
				status: {
					id: event.to,
					__typename: 'ProductStatusType'
				}
			})
		}).subscribe();
	}

	updateProductsStatus(event: { to: any, items: any[] }) {
		const products = event.items.map(id => ({
			id,
			status: new ProductStatus({ status: { id: event.to, __typename: 'ProductStatusType' } })
		}));
		this.productSrv.updateMany(products).subscribe();
	}

	onColumnSelected(products: Product[]) {
		products.forEach(prod => this.selectionSrv.selectOne(prod, true));
	}

	onColumnUnselected(products: Product[]) {
		products.forEach(prod => this.selectionSrv.unselectOne(prod, true));
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
	 * Selection bar actions
	 *
	 * Each of the actions to open dialog below will open a dialog that is itself a container.
	 */

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(product: Product) {
		this.commonDlgSrv.openAddToProjectDialog(product ? [product] : this.getSelectedProducts());
	}


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.commonDlgSrv.openExportDialog(product ? [product] : this.getSelectedProducts());
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.commonDlgSrv.openRequestFeedbackDialog(product ? [product] : this.getSelectedProducts());
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
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
