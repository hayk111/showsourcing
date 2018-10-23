import { ChangeDetectorRef, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { ProductService, ProjectService } from '~global-services';
import { ERM, KanbanColumn, Product, ProductVote, Project } from '~models';
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


@Component({
	selector: 'project-workflow-app',
	templateUrl: './project-workflow.component.html',
	styleUrls: ['./project-workflow.component.scss'],
})
export class ProjectWorkflowComponent extends ListPageComponent<Product, ProductService> implements OnInit {
	project$: Observable<Project>;
	// statuses$ = new Subject<ProductStatus[]>();
	columns$: Observable<KanbanColumn[]>;
	id: string;
	project: Project;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;

	constructor(
		protected router: Router,
		protected route: ActivatedRoute,
		protected projectSrv: ProjectService,
		protected productSrv: ProductService,
		protected workflowService: ProjectWorkflowFeatureService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected cdr: ChangeDetectorRef,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>,
		protected featureSrv: ProjectWorkflowFeatureService,
		protected notifSrv: NotificationService,
		protected thumbSrv: ThumbService) {
		super(router, productSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT, thumbSrv, FindProductsDialogComponent);
	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.project$ = this.projectSrv.queryOne(id);
		this.project$.subscribe(project => this.project = project);

		this.columns$ = this.project$.pipe(
			takeUntil(this._destroy$),
			switchMap(project => this.workflowService.getStatuses(project)),
			map(statuses => this.convertStatusesToColumns(statuses)),
		);

		this.selected$ = this.selectionSrv.selection$;
	}

	/** Convert statuses / products into the generic input for kanban */
	convertStatusesToColumns(statuses) {
		return statuses.map(status => ({
			id: status.id,
			name: status.name,
			color: this.getColumnColor(status),
			disabled: (status.name === '_NoStatus'),
			items: status.products.map(product => ({
				...product,
				cat: (product.status && product.status.status) ? {
					id: product.status.status.id
				} : { id: -1 }
			}))
		}));
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

	onUpdateProductStatus({ target, droppedElement }) {
		if (droppedElement) {
			droppedElement.forEach(element => {
				this.workflowService.updateProductStatus(element, target)
					.subscribe(() => this.cdr.detectChanges());
			});
		}
	}

	/** updates the products with the new value votes */
	multipleVotes(votes: Map<string, ProductVote[]>) {
		votes.forEach((v, k) => this.update({ id: k, votes: v }));
	}

	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg() {
		if (this.project) {
			this.featureSrv.getProjectProducts(this.project).pipe(first()).subscribe(products => {
				this.dlgSrv.openFromModule(FindProductsDialogComponent, this.moduleRef, {
					type: ERM.PRODUCT,
					shouldRedirect: false,
					initialSelectedProducts: products,
					submitCallback: this.associateProductsWithProject.bind(this)
				});
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
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
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
				this.notifSrv.add({
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
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Products Updated',
					message: 'The products were updated in the project with success',
					timeout: 3500
				});
			})
		);
	}
}
