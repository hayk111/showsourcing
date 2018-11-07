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
import { ThumbService } from '~shared/rating/services/thumbs.service';


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
		private templateSrv: TemplateService,
		protected thumbSrv: ThumbService) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT, thumbSrv);
	}

	ngOnInit() {
		this.selectionSrv.unselectAll();

		this.initialPredicate = `deleted == false && archived == false && status == null`;
		this.initialSortBy = 'supplier.name';

		super.ngOnInit();

		this.selected$ = this.selectionSrv.selection$;

		this.templateSrv.bottomReached$.pipe(
			takeUntil(this._destroy$)
		).subscribe(_ => {
			this.loadMore();
		});

	}

	protected setItems() {
		this.listResult = this.featureSrv.getListQuery({
			query: this.initialPredicate,
			sortBy: this.initialSortBy,
			descending: false
		});

		this.items$ = this.listResult.items$.pipe(
			tap(_ => this.onLoaded()),
			tap(items => this.items = items),
			map(items => items.filter(item => !item.deleted && !item.archived && !item.status))
		);
	}

	/** Returns the selected products */
	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}

	/** Update the sort from the menu */
	sortFromMenu(fieldName) {
		if (this.currentSort && this.currentSort.sortBy === fieldName) {
			this.currentSort = { ...this.currentSort, descending: !this.currentSort.descending };
		} else {
			this.currentSort = { ...this.currentSort, sortBy: fieldName };
		}
		this.sort(this.currentSort);
	}

	/** Add a product to workflow */
	onSentToWorkflow(product: Product) {
		this.workspaceSrv.sendProductToWorkflow(product).subscribe();
		this.onItemUnselected(product, true);
	}

	/** Triggers archive product */
	onArchive(product: Product) {
		const { id } = product;
		this.workspaceSrv.update({ id, archived: true }, 'archived').subscribe();
	}

	/** Triggers status update */
	onStatusUpdated({ product, status }) {
		this.workspaceSrv.updateProductStatus(product, status).subscribe();
	}

	/** updates the products with the new value votes */
	multipleVotes(votes: Map<string, ProductVote[]>) {
		votes.forEach((v, k) => this.update({ id: k, votes: v }));
	}

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog() {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
			selectedProducts: this.getSelectedProducts()
		});
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog() {
		this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
			selectedProducts: this.selectionItems()
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog() {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: this.selectionItems()
		});
	}

}
