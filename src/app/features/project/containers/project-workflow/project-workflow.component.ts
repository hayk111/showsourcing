import { ChangeDetectorRef, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { ProductService, ProjectService, ProductStatusTypeService } from '~global-services';
import { ERM, Product, ProductVote, Project, ProductStatus } from '~models';
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

@Component({
	selector: 'project-workflow-app',
	templateUrl: './project-workflow.component.html',
	styleUrls: ['./project-workflow.component.scss'],
})
export class ProjectWorkflowComponent extends ListPageComponent<any, any> implements OnInit {
	project$: Observable<Project>;
	columns$: Observable<KanbanColumn[]>;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;

	constructor(
		protected route: ActivatedRoute,
		protected projectSrv: ProjectService,
		protected productSrv: ProductService,
		protected productStatusSrv: ProductStatusTypeService,
		protected router: Router,
		protected selectionSrv: SelectionService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>,
		protected thumbSrv: ThumbService
	) {
		super(
			router,
			productSrv,
			selectionSrv,
			searchSrv,
			dlgSrv,
			moduleRef,
			ERM.PRODUCT,
			thumbSrv);
	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.project$ = this.projectSrv.queryOne(id);

		const products$ = this.productSrv.queryAll(ProductQueries.many, {
			query: `projects.id == "${id}"`,
			sortBy: 'lastUpdatedDate',
		}).pipe(
			first(),
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
			});

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

	/** updates the products with the new value votes */
	// multipleVotes(votes: Map<string, ProductVote[]>) {
	// 	votes.forEach((v, k) => this.update({ id: k, votes: v }));
	// }

	/** Open the find products dialog and passing selected products to it */
	// openFindProductDlg() {
	// 	if (this.project) {
	// 		this.featureSrv.getProjectProducts(this.project).pipe(first()).subscribe(products => {
	// 			this.dlgSrv.openFromModule(FindProductsDialogComponent, this.moduleRef, {
	// 				type: ERM.PRODUCT,
	// 				shouldRedirect: false,
	// 				initialSelectedProducts: products,
	// 				submitCallback: this.associateProductsWithProject.bind(this)
	// 			});
	// 		});
	// 	}
	// }

	/**
	 * Selection bar actions
	 *
	 * Each of the actions to open dialog below will open a dialog that is itself a container.
	 */

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	// openAddToProjectDialog(product: Product) {
	// 	this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
	// 		selectedProducts: product ? [product] : this.getSelectedProducts()
	// 	});
	// }


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	// openExportDialog(product: Product) {
	// 	this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
	// 		selectedProducts: product ? [product] : this.getSelectedProducts()
	// 	});
	// }

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	// openRequestFeedbackDialog(product: Product) {
	// 	this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
	// 		selectedProducts: product ? [product] : this.getSelectedProducts()
	// 	});
	// }

	// getSelectedProducts() {
	// 	return Array.from(this.selectionSrv.selection.values());
	// }

	/**
	 * Deassociate the selected product from the current project
	 */
	// deassociateProduct(product: Product) {
	// 	this.featureSrv.manageProjectsToProductsAssociations([this.project], [], [product]).pipe(
	// 		tap(() => {
	// 			this.workflowService.refreshStatuses(this.project);
	// 			this.notifSrv.add({
	// 				type: NotificationType.SUCCESS,
	// 				title: 'Products Updated',
	// 				message: 'The products were updated in the project with success',
	// 				timeout: 3500
	// 			});
	// 		})
	// 	).subscribe();
	// }

	/**
	 * Associate the selected products from the current project. This method is
	 * passed as callback for the "find products" dialog.
	 */
	// associateProductsWithProject({ selectedProducts, unselectedProducts }: { selectedProducts: Product[], unselectedProducts: Product[] }) {
	// 	return this.featureSrv.manageProjectsToProductsAssociations([this.project], selectedProducts, unselectedProducts).pipe(
	// 		tap(() => {
	// 			this.workflowService.refreshStatuses(this.project);
	// 			this.notifSrv.add({
	// 				type: NotificationType.SUCCESS,
	// 				title: 'Products Updated',
	// 				message: 'The products were updated in the project with success',
	// 				timeout: 3500
	// 			});
	// 		})
	// 	);
	// }
}
