import { ChangeDetectorRef, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { ProductService, ProjectService } from '~global-services';
import { ERM, Product, Project } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { FindProductDialogComponent } from '~shared/custom-dialog/component/find-product-dialog/find-product-dialog.component';


@Component({
	selector: 'project-workflow-app',
	templateUrl: './project-workflow.component.html',
	styleUrls: ['./project-workflow.component.scss'],
})
export class ProjectWorkflowComponent implements OnInit {
	project$: Observable<Project>;
	statuses$: Observable<any>;
	id: string;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;

	constructor(
		private route: ActivatedRoute,
		private projectSrv: ProjectService,
		private productSrv: ProductService,
		private workflowService: ProjectWorkflowFeatureService,
		private selectionSrv: SelectionService,
		private cdr: ChangeDetectorRef,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>
	) { }

	ngOnInit() {
		this.project$ = this.route.parent.params.pipe(
			map(params => params.id),
			tap(id => this.id = id),
			switchMap(id => this.projectSrv.selectOne(id)),
		);

		this.statuses$ = this.project$.pipe(
			switchMap(project => this.workflowService.getStatuses(project))
		);

		this.selected$ = this.selectionSrv.selection$;
	}

	onUpdateProductStatus({ target, droppedElement }) {
		this.workflowService.updateProductStatus(droppedElement, target).subscribe(() => {
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

	openFindProductDlg() {
		this.dlgSrv.openFromModule(FindProductDialogComponent, this.moduleRef, {
			callback: () => { }
		});
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
		const text = `Delete ${items.length} ${items.length > 1 ? ERM.ITEM.plural : ERM.ITEM.singular} ?`;
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
