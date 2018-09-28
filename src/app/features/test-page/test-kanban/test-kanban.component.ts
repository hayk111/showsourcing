import { ChangeDetectorRef, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap, first, takeUntil } from 'rxjs/operators';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { ProductService, ProjectService } from '~global-services';
import { ERM, Product, Project, ProductStatus, ProductVote } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SearchService, FilterType, Filter } from '~shared/filters';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { FindProductsDialogComponent } from '~shared/product-common/containers/find-products-dialog/find-products-dialog.component';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils/auto-unsub.component';


@Component({
	selector: 'app-test-kanban',
	templateUrl: './test-kanban.component.html',
	styleUrls: ['./test-kanban.component.scss'],
})
export class TestKanbanComponent extends ListPageComponent<Product, ProductService>  implements OnInit {
	project$: Observable<Project>;
	// statuses$ = new Subject<ProductStatus[]>();
	columns$: Observable<ProductStatus[]>;
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
		protected notifSrv: NotificationService
	) {
		super(router, productSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT, FindProductsDialogComponent);
	}

	ngOnInit() {
		const id = 'f2005fed-93c6-4890-b5af-87be7a23db67'; // this.route.parent.snapshot.params.id;
		this.project$ = this.projectSrv.queryOne(id);

		this.columns$ = this.project$.pipe(
			takeUntil(this._destroy$),
			switchMap(project => this.workflowService.getStatuses(project)),
			map(statuses => this.convertStatusesToColumns(statuses))
		);

		this.selected$ = this.selectionSrv.selection$;
	}

	convertStatusesToColumns(statuses) {
		return statuses.map(status => ({
			id: status.id,
			name: status.name,
			disabled: (status.name === '_NoStatus'),
			items: status.products.map(product => ({
				id: product.id,
				name: product.name,
				cat: (product.status && product.status.status) ? {
					id: product.status.status.id
				} : { id: -1 }
			}))
		}));
	}

	getCurrentColumnFct(data) {
		return data.cat ? data.cat.id : '';
	}

	onUpdateProductStatus({ target, droppedElement }) {
		this.workflowService.updateProductStatus(droppedElement, target)
			.subscribe(() => this.cdr.detectChanges());
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

/* import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionService } from '~shared/list-page/selection.service';


@Component({
	selector: 'app-test-kanban',
	templateUrl: './test-kanban.component.html',
	styleUrls: ['./test-kanban.component.scss'],
})
export class TestKanbanComponent implements OnInit {
	columns = [
		{
			id: 'test',
			name: 'test',
			items: [
				{
					id: 'item1',
					name: 'item1',
					cat: {
						id: 'test'
					}
				}
			]
		},
		{
			id: 'test1',
			name: 'test1',
			items: [
			]
		},
		{
			id: 'test2',
			name: 'test2',
			disabled: true,
			items: [
				{
					id: 'item2',
					name: 'item2',
					cat: {
						id: 'test2'
					}
				}
			]
		}
	];

	selected$: Observable<Map<string, boolean>>;

	constructor(protected selectionSrv: SelectionService) {

	}

	ngOnInit() {
		this.selected$ = this.selectionSrv.selection$;
	}

	getCurrentColumnFct(data) {
		return data.cat;
	}

	onItemDropped(evt) {
		console.log('>> onItemDropped - event = ', evt);
	}

	onItemSelected(item, flag) {
		console.log('>> onItemSelected - event = ', item);
		this.selectionSrv.selectOne(item);
	}

	onItemUnselected(item, flag) {
		console.log('>> onItemUnselected - event = ', item);
		this.selectionSrv.unselectOne(item);
	}

	selectAll(items, flag) {
		console.log('>> selectAll - event = ', items);
		this.selectionSrv.selectAll(items);
	}

	resetSelection(items) {
		console.log('>> resetSelection - evt = ', items);
		if (items) {
			items.forEach(item => this.selectionSrv.unselectOne(item));
		}
	}
} */
