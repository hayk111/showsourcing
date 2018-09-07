import { ChangeDetectorRef, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap, first, takeUntil } from 'rxjs/operators';
import { WorkspaceWorkflowFeatureService } from '~features/workspace/services/workspace-workflow-feature.service';
import { ProductService, ProjectService } from '~global-services';
import { ERM, Product, Project, ProductStatus } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils/auto-unsub.component';


@Component({
	selector: 'workspace-my-products-page-app',
	templateUrl: './my-products-page.component.html',
	styleUrls: ['./my-products-page.component.scss']
})
export class MyProductsPageComponent extends AutoUnsub implements OnInit {

	project$: Observable<Project>;
	statuses$ = new Subject<ProductStatus[]>();
	id: string;
	project: Project;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;

	constructor(
		private route: ActivatedRoute,
		private projectSrv: ProjectService,
		private productSrv: ProductService,
		private workflowService: WorkspaceWorkflowFeatureService,
		private selectionSrv: SelectionService,
		private cdr: ChangeDetectorRef,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>,
		protected featureSrv: WorkspaceWorkflowFeatureService,
		private notifSrv: NotificationService
	) {
		super();
	}

	ngOnInit() {
		/* this.project$ = this.route.parent.params.pipe(
			map(params => params.id),
			tap(id => this.id = id),
			switchMap(id => this.projectSrv.selectOne(id)),
			tap(project => this.project = project)
		);

		this.project$.pipe(
			takeUntil(this._destroy$),
			switchMap(project => this.workflowService.getStatuses(project))
		).subscribe(statuses => {
			this.statuses$.next(statuses);
		}); */

		this.workflowService.getStatuses().pipe(
			takeUntil(this._destroy$)
		).subscribe(statuses => {
			this.statuses$.next(statuses);
		});

		this.selected$ = this.selectionSrv.selection$;
	}

	search(search: string) {
		this.workflowService.getStatuses(true, search).pipe(
			takeUntil(this._destroy$)
		).subscribe(statuses => {
			this.statuses$.next(statuses);
		});
	}

	onUpdateProductStatus({ target, droppedElement }) {
		this.workflowService.updateProductStatus(droppedElement, target)
			.subscribe(() => {
				this.cdr.detectChanges();
			});
	}

	/** Selects a an entity */
	onItemSelected(entity: any) {
		this.selectionSrv.selectOne(entity);
	}

	/** Unselects a entity */
	onItemUnselected(entity: any) {
		this.selectionSrv.unselectOne(entity);
	}

	/** Selects an entity */
	onAllItemsSelected(entity: any) {
		this.selectionSrv.selectAll(entity);
	}

	/** Unselects a entity */
	onAllItemsUnselected(entity: any) {
		this.selectionSrv.unselectOne(entity);
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

	/** Will show a confirm dialog to delete items selected */
	deleteSelected() {
		const items = Array.from(this.selectionSrv.selection.keys());
		// callback for confirm dialog
		const callback = () => {
			this.productSrv.deleteMany(items).subscribe(() => {
				this.resetSelection();
			});
		};
		const text = `Delete ${items.length} ${items.length > 1 ? 'items' : 'item'} ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text, callback });
	}

	/** Unselect all entity */
	resetSelection() {
		this.selectionSrv.unselectAll();
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}

}
