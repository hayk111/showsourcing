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
import { TemplateService } from '~shared/template/services/template.service';


@Component({
	selector: 'workspace-review-page-app',
	templateUrl: './review-page.component.html',
	styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent extends ListPageComponent<Product, WorkspaceFeatureService> implements OnInit {

	products$ = new Subject<Product[]>();
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;
	currentSort = { sortBy: 'supplier.name', descending: true };
	currentSearch = null;

	constructor(
		protected router: Router,
		protected featureSrv: WorkspaceFeatureService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected cdr: ChangeDetectorRef,
		protected workspaceSrv: WorkspaceFeatureService,
		protected notificationSrv: NotificationService,
		protected moduleRef: NgModuleRef<any>,
		private templateSrv: TemplateService) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT);
	}

	ngOnInit() {
		this.selectionSrv.unselectAll();

		this.initialPredicate = `deleted == false && archived == false`;
		this.initialSortBy = 'supplier.name';

		super.ngOnInit();

		this.selected$ = this.selectionSrv.selection$;

		this.templateSrv.bottomReached$.pipe(
			takeUntil(this._destroy$)
		).subscribe(() => {
			this.loadMore();
		});

	}

	onUpdateProductStatus({ target, droppedElement }) {
		this.workspaceSrv.updateProductStatus(droppedElement, target)
			.subscribe(() => {
				this.notificationSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Product Status Updated',
					message: 'The invitation was accepted',
					timeout: 3500
				});
				this.cdr.detectChanges();
			});
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}

	sortFromMenu(fieldName) {
		if (this.currentSort && this.currentSort.sortBy === fieldName) {
			this.currentSort = { ...this.currentSort, descending: !this.currentSort.descending };
		} else {
			this.currentSort = { ...this.currentSort, sortBy: fieldName };
		}
		this.sort(this.currentSort);
	}

	onSentToWorkflow(product: Product) {
		this.workspaceSrv.sendProductToWorkflow(product).subscribe(() => {
			this.refetch();
		});
	}

	onArchive(product: Product) {
		const { id } = product;
		this.workspaceSrv.update({ id, archived: true }, 'archived').subscribe(() => {
			this.refetch();
		});
	}

	onStatusUpdated({ product, status }) {
		this.workspaceSrv.updateProductStatus(product, status).subscribe(() => {
			this.refetch();
		});
	}

	/** updates the products with the new value votes */
	multipleVotes(votes: Map<string, ProductVote[]>) {
		votes.forEach((v, k) => this.update({ id: k, votes: v }));
	}

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.selectionItems()
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.selectionItems()
		});
	}

}
