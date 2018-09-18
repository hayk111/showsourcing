import { ChangeDetectorRef, Component, NgModuleRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap, first, takeUntil } from 'rxjs/operators';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { ProductService, ProjectService } from '~global-services';
import { ERM, Product, Project, ProductStatus, ProductVote } from '~models';
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
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SearchService } from '~shared/filters';


@Component({
	selector: 'workspace-my-workflow-page-app',
	templateUrl: './my-workflow-page.component.html',
	styleUrls: ['./my-workflow-page.component.scss']
})
export class MyWorkflowPageComponent extends ListPageComponent<Product, WorkspaceFeatureService> implements OnInit {

	statuses$ = new Subject<ProductStatus[]>();
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;

	constructor(
		protected router: Router,
		protected featureSrv: WorkspaceFeatureService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected cdr: ChangeDetectorRef,
		protected workspaceSrv: WorkspaceFeatureService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT);
	}

	ngOnInit() {
		this.selectionSrv.unselectAll();

		super.ngOnInit();

		this.workspaceSrv.getStatuses().pipe(
			takeUntil(this._destroy$)
		).subscribe(statuses => {
			this.statuses$.next(statuses);
		});

		this.selected$ = this.selectionSrv.selection$;
	}

	search(search: string) {
		this.workspaceSrv.getStatuses(true, search).pipe(
			takeUntil(this._destroy$)
		).subscribe(statuses => {
			this.statuses$.next(statuses);
		});
	}

	/** updates the products with the new value votes */
	multipleVotes(votes: Map<string, ProductVote[]>) {
		votes.forEach((v, k) => this.update({ id: k, votes: v }));
	}

	onUpdateProductStatus({ target, droppedElement }) {
		this.workspaceSrv.updateProductStatus(droppedElement, target)
			.subscribe(() => {
				this.cdr.detectChanges();
			});
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
			this.workspaceSrv.deleteMany(items).subscribe(() => {
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
